import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.register["$post"]({ json });

      if (!response.ok) {
        return response.json();
      }

      const response2 = await client.api.auth.addUserDetails["$post"]({ json });
      if (response2.ok) {
        toast.success("Registered successfully");
        return response.json();
      } else {
        const response = await client.api.auth.delete["$delete"]({ json });
        return response.json();
      }
    },
    onSuccess: (data) => {
      //window.location.reload()

      if (data.error) {
        toast.error(data.error);
        return;
      }
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
    onError: (error) => {
      console.log({ error });
      toast.error("Failed to register");
    },
  });

  return mutation;
};
