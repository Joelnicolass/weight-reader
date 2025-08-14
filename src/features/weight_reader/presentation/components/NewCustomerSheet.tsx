import { Users, Phone, MapIcon } from "lucide-react";
import {
  AppCard,
  AppCardDescription,
  AppCardHeader,
  AppCardTitle,
  AppSeparator,
  AppSheet,
  AppSheetContent,
  AppInputForm,
  AppButton,
} from "@/common/components/ui";
import { useFormik } from "formik";

interface NewCustomerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCustomerAdded?: (customer: {
    name: string;
    phone: string;
    address: string;
  }) => void;
}

export default function NewCustomerSheet({
  open,
  onOpenChange,
  onCustomerAdded,
}: NewCustomerSheetProps) {
  const formAddCustomer = useFormik({
    initialValues: {
      customerName: "",
      customerPhone: "",
      customerAddress: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log("Nuevo Cliente:", values);
      onCustomerAdded?.({
        name: values.customerName,
        phone: values.customerPhone,
        address: values.customerAddress,
      });
      resetForm();
      onOpenChange(false);
    },
  });

  const handleClose = () => {
    formAddCustomer.resetForm();
    onOpenChange(false);
  };

  return (
    <AppSheet modal open={open} onOpenChange={handleClose}>
      <AppSheetContent>
        <form onSubmit={formAddCustomer.handleSubmit}>
          <AppCard className="border-none">
            <AppCardHeader className="p-0">
              <AppCardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Agregar un nuevo cliente
              </AppCardTitle>
              <AppCardDescription>
                Complete los datos del nuevo cliente
              </AppCardDescription>
            </AppCardHeader>
          </AppCard>
          <AppSeparator className="my-4" />

          <div className="gap-4 flex flex-col">
            <AppInputForm
              type="input"
              id="customerName"
              label="Nombre del Cliente"
              icon={Users}
              required
              placeholder="Nombre del cliente"
              value={formAddCustomer.values.customerName}
              onChange={formAddCustomer.handleChange}
            />

            <AppInputForm
              type="input"
              id="customerPhone"
              label="Telefono"
              icon={Phone}
              placeholder="Teléfono del cliente"
              value={formAddCustomer.values.customerPhone}
              onChange={formAddCustomer.handleChange}
            />

            <AppInputForm
              type="input"
              id="customerAddress"
              label="Dirección"
              icon={MapIcon}
              placeholder="Dirección del cliente"
              value={formAddCustomer.values.customerAddress}
              onChange={formAddCustomer.handleChange}
            />
          </div>

          <div className="flex gap-2 mt-6">
            <AppButton
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancelar
            </AppButton>
            <AppButton type="submit" className="flex-1">
              Agregar Cliente
            </AppButton>
          </div>
        </form>
      </AppSheetContent>
    </AppSheet>
  );
}
