"use client";

import { DataTable } from "@/components/ui/data-table";
import { Modal } from "@/components/ui/modal";
import { Typography } from "@/components/ui/typography";
import { trpc } from "@/utils/trpc";
import { ColumnDef } from "@tanstack/react-table";
import { NextPage } from "next";
import {
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "next-usequerystate";
import { ReactElement, useState } from "react";
import { Form } from "@/components/ui/form";
import { ControlledFieldText } from "@/components/ui/controlled-field-text";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifyMessage } from "@/utils";

const createQuestionSchema = z.object({
  question: z
    .string({ required_error: "Pertanyaan harus diisi" })
    .min(1, "Pertanyaan harus diisi"),
  dimension: z
    .string({ required_error: "Kategori harus diisi" })
    .min(1, "Kategori harus diisi"),
  indicator: z
    .string({ required_error: "Indikator harus diisi" })
    .min(1, "Indikator harus diisi"),
  id: z.string().optional(),
});

const DashboardQuestionPage: NextPage = (): ReactElement => {
  const { mutate } = trpc.createQuestion.useMutation();
  const { mutate: mutateUpdate } = trpc.updateQuestion.useMutation();
  const { mutate: mutateDelete } = trpc.deleteQuestion.useMutation();
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  );
  const { data, refetch } = trpc.getQuestions.useQuery({
    perPage: 5,
    page,
    search,
  });

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty, errors },
    reset,
  } = useForm<z.infer<typeof createQuestionSchema>>({
    mode: "onChange",
    resolver: zodResolver(createQuestionSchema),
  });

  const [modal, setModal] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [id, setId] = useState("");

  const columns: ColumnDef<any>[] = [
    {
      header: "Dimensi",
      accessorKey: "dimension",
    },
    {
      header: "Indikator",
      accessorKey: "indicator",
    },

    {
      header: "Pertanyaan",
      accessorKey: "question",
      accessorFn: (data) => data.question || "-",
    },

    {
      header: "Tindakan",
      cell: ({ row }) => {
        return (
          <section className="flex gap-x-2">
            <Button
              onClick={() => {
                reset(row.original);
                setModalUpdate(true);
              }}
              variant={"primary"}
              size={"sm"}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                setModalDelete(true);
                setId(row.original.id);
              }}
              variant={"danger"}
              size={"sm"}
            >
              Hapus
            </Button>
          </section>
        );
      },
    },
  ];

  const onSubmit = handleSubmit((input) => {
    mutate(input, {
      onSuccess: () => {
        notifyMessage({
          type: "success",
          message: "Pertanyaan berhasil ditambah",
        });
        setModal(false);
        refetch();
        reset({
          question: "",
          indicator: "",
          dimension: "",
        });
      },

      onError: () => {
        notifyMessage({ type: "error", message: "Pertanyaan gagal ditambah" });
        setModal(false);
        reset({
          question: "",
          indicator: "",
          dimension: "",
        });
      },
    });
  });

  const onSubmitUpdate = handleSubmit((input) => {
    mutateUpdate(input, {
      onSuccess: () => {
        notifyMessage({
          type: "success",
          message: "Pertanyaan berhasil diedit",
        });
        setModalUpdate(false);
        refetch();
        reset({
          question: "",
          indicator: "",
          dimension: "",
        });
      },

      onError: () => {
        notifyMessage({ type: "error", message: "Pertanyaan gagal diedit" });
        setModalUpdate(false);
        reset({
          question: "",
          indicator: "",
          dimension: "",
        });
      },
    });
  });

  return (
    <section className="flex flex-col mt-6 bg-white p-6 rounded-lg w-auto gap-y-4 h-full overflow-x-auto">
      <div className="flex gap-x-2">
        <Typography color="text-grey-300">EDOM</Typography>
        <Typography color="text-grey-300"> / </Typography>
        <Typography color="text-grey-300"> Kelola Pertanyaan </Typography>
        <Typography color="text-grey-300"> / </Typography>
        <Typography color="text-success-800"> Mangement Pertanyaan </Typography>
      </div>

      <Typography size="title-5" variant="semi-bold" color="text-success-800">
        Management Pertanyaan
      </Typography>

      <div className="flex flex-col h-full gap-y-6 mt-8">
        <DataTable
          createAction={() => setModal(!modal)}
          createLabel="Tambah Pertanyaan +"
          data={data?.data || []}
          columns={columns}
          meta={data?.meta}
          handleSearch={(e) => setSearch(e.target.value)}
        />
      </div>

      <Modal
        isOpen={modal}
        onClose={() => setModal(!modal)}
        width="400px"
        height="auto"
        title="Tambah Pertanyaan"
      >
        <Form onSubmit={onSubmit} className="w-full flex flex-col gap-y-4">
          <ControlledFieldText
            label="Pertanyaan"
            size="sm"
            control={control}
            name="question"
            placeholder="Masukkan Pertanyaan"
            status={errors.question?.message ? "error" : "none"}
            message={errors.question?.message}
          />
          <ControlledFieldText
            label="Kategori"
            size="sm"
            control={control}
            name="dimension"
            placeholder="Masukkan Kategori"
            status={errors.dimension?.message ? "error" : "none"}
            message={errors.dimension?.message}
          />
          <ControlledFieldText
            label="Indikator"
            size="sm"
            control={control}
            name="indicator"
            placeholder="Masukkan Indicator"
            status={errors.indicator?.message ? "error" : "none"}
            message={errors.indicator?.message}
          />
          <div className="flex gap-x-4">
            <Button
              disabled={!isValid}
              variant="primary"
              type="submit"
              size="sm"
            >
              Simpan
            </Button>
            <Button
              onClick={() => setModal(!modal)}
              variant="cancel"
              type="button"
              size="sm"
            >
              Batal
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        isOpen={modalUpdate}
        onClose={() => setModalUpdate(!modalUpdate)}
        width="400px"
        height="auto"
        title="Edit Pertanyaan"
      >
        <Form
          onSubmit={onSubmitUpdate}
          className="w-full flex flex-col gap-y-4"
        >
          <ControlledFieldText
            label="Pertanyaan"
            size="sm"
            control={control}
            name="question"
            placeholder="Masukkan Pertanyaan"
            status={errors.question?.message ? "error" : "none"}
            message={errors.question?.message}
          />
          <ControlledFieldText
            label="Kategori"
            size="sm"
            control={control}
            name="dimension"
            placeholder="Masukkan Kategori"
            status={errors.dimension?.message ? "error" : "none"}
            message={errors.dimension?.message}
          />
          <ControlledFieldText
            label="Indikator"
            size="sm"
            control={control}
            name="indicator"
            placeholder="Masukkan Indicator"
            status={errors.indicator?.message ? "error" : "none"}
            message={errors.indicator?.message}
          />

          <div className="flex gap-x-4">
            <Button
              disabled={!isValid && !isDirty}
              variant="primary"
              type="submit"
              size="sm"
            >
              Simpan
            </Button>
            <Button
              onClick={() => {
                reset({
                  question: "",
                  dimension: "",
                  indicator: "",
                });
                setModalUpdate(!modalUpdate);
              }}
              variant="cancel"
              type="button"
              size="sm"
            >
              Batal
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        isOpen={modalDelete}
        onClose={() => setModalUpdate(!modalDelete)}
        width="400px"
        height="auto"
        title="Hapus Pertanyaan"
      >
        <Form
          onSubmit={onSubmitUpdate}
          className="w-full flex flex-col gap-y-4"
        >
          <div className="flex gap-x-4">
            <Button
              onClick={() =>
                mutateDelete(id, {
                  onSuccess: () => {
                    setModalDelete(!modalDelete);
                    setId("");
                    notifyMessage({
                      type: "success",
                      message: "Pertanyaan berhasil di hapus",
                    });
                    refetch();
                  },

                  onError: () => {
                    setModalDelete(!modalDelete);
                    setId("");
                    notifyMessage({
                      type: "error",
                      message: "Pertanyaan gagal di hapus",
                    });
                  },
                })
              }
              variant="primary"
              type="submit"
              size="sm"
            >
              Hapus
            </Button>
            <Button
              onClick={() => {
                setModalDelete(!modalDelete);
                setId("");
              }}
              variant="cancel"
              type="button"
              size="sm"
            >
              Batal
            </Button>
          </div>
        </Form>
      </Modal>
    </section>
  );
};

export default DashboardQuestionPage;
