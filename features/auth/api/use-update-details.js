import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useUpdateDetails = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.updateDetails["$post"]({ json });

      if (!response.ok) throw new Error("Failed to updateDetails");

      return response.json();
    },
    onSuccess: () => {
      //window.location.reload()
      toast.success("Updated successfully");
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  return mutation;
};
