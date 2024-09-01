import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  Flex,
  Text,
  useDisclosure,
  useBreakpointValue,
  IconButton,
  Stack,
  FormErrorMessage,
} from "@chakra-ui/react";
import {  useNavigate } from "react-router-dom";
import { createProject } from "../../../api/projectsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { routes } from "../../../routes";
import { queryKeys } from "../../../queryKeys";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import RootLayout from "../../Roots/RootLayout";
import { hideMd } from "../../../config";
import MenuDrawer from "../MenuDrawer";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useEffect } from "react";

const createProjectFormSchema = z.object({
  newProject: z
    .string()
    .min(5, { message: "Name must contain at least 5 character(s)" }),
});

const CreatingProject = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.all() });
      navigate(routes.projects.details({ projectId }));
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof createProjectFormSchema>>({
    resolver: zodResolver(createProjectFormSchema),
    disabled: createProjectMutation.isPending,
  });

  const burgerMenuDrafter = useDisclosure();
  const burgerButtonStyle = useBreakpointValue(hideMd);

  useEffect(() => {
    document.title = "Create Project - Management";
    return () => {
      document.title = "Management";
    };
  }, []);

  const handleCreateProject = (newProject: string) => {
    const projectId = uuidv4();
    createProjectMutation.mutate({ newProject, projectId });
  };

  return (
    <RootLayout>
      <Container>
        <Stack direction="column">
          <Stack direction="row-reverse">
            <IconButton
              w={4}
              display={burgerButtonStyle}
              aria-label="Open burger menu"
              icon={<HamburgerIcon />}
              onClick={burgerMenuDrafter.onOpen}
            />
          </Stack>
          <form
            onSubmit={handleSubmit((data) => {
              handleCreateProject(data.newProject);
            })}
          >
            <FormControl isInvalid={!!errors.newProject}>
              <Flex direction="column" maxW={80}>
                <FormLabel htmlFor="newProject">
                  <Text fontSize="4xl">New Project</Text>
                </FormLabel>
                <Input
                  w="100%"
                  {...register("newProject")}
                  id="newProject"
                  placeholder="My first project"
                  autoFocus
                />
                {errors.newProject && (
                  <FormErrorMessage>
                    {errors.newProject.message}
                  </FormErrorMessage>
                )}
              </Flex>
            </FormControl>
            <Button
              maxW={80}
              w="100%"
              variant="outline"
              isLoading={createProjectMutation.isPending}
              type="submit"
              m={1}
            >
              Create
            </Button>
          </form>
        </Stack>
        <MenuDrawer
          onClose={burgerMenuDrafter.onClose}
          isOpen={burgerMenuDrafter.isOpen}
        />
      </Container>
    </RootLayout>
  );
};

export default CreatingProject;
