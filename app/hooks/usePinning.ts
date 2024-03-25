import { useNotification } from "@refinedev/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useContext } from "react";
import { PinningProcess } from "~/data/pinning";
import { PinningContext } from "~/providers/PinningProvider";

export const usePinning = () => {
  const queryClient = useQueryClient();
  const context = useContext(PinningContext);
  const { open } = useNotification();

  const { status: pinStatus, data: pinData, mutate: pinMutation } = useMutation({
    mutationKey: ["pin-mutation"],
    mutationFn: async (variables: { cid: string }) => {
      const { cid } = variables;
      const response = await PinningProcess.pin(cid);

      if (!response.success) {
        open?.({
          type: "error",
          message: `Error pinning ${cid}`,
          description: response.message,
        });
      }

      queryClient.invalidateQueries({ queryKey: ["pin-progress", "file"] });
    },
  });

  const { status: unpinStatus, data: unpinData, mutate: unpinMutation } = useMutation({
    mutationKey: ["unpin-mutation"],
    mutationFn: async (variables: { cid: string }) => {
      const { cid } = variables;
      const response = await PinningProcess.unpin(cid);

      if (!response.success) {
        open?.({
          type: "error",
          message: `Error removing ${cid}`,
          description: response.message,
        });
      }
      queryClient.invalidateQueries({ queryKey: ["pin-progress"] });
    },
  });

  const bulkPin = useCallback(
    (cids: string[]) => {
      for (const cid of cids) {
        pinMutation({ cid });
      }
    },
    [pinMutation],
  );

  return {
    progressStatus: context.query.status,
    progressData: context.query.data,
    pinStatus,
    pinData,
    unpinStatus,
    unpinData,
    pin: pinMutation,
    unpin: unpinMutation,
    bulkPin,
  };
};
