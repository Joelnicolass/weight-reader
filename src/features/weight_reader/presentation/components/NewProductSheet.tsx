import { Package, FileText } from "lucide-react";
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

interface NewProductSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductAdded?: (product: {
    name: string;
    description: string;
    category: string;
  }) => void;
}

export default function NewProductSheet({
  open,
  onOpenChange,
  onProductAdded,
}: NewProductSheetProps) {
  const formAddProduct = useFormik({
    initialValues: {
      productName: "",
      productDescription: "",
      productCategory: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log("Nuevo Producto:", values);
      onProductAdded?.({
        name: values.productName,
        description: values.productDescription,
        category: values.productCategory,
      });
      resetForm();
      onOpenChange(false);
    },
  });

  const handleClose = () => {
    formAddProduct.resetForm();
    onOpenChange(false);
  };

  return (
    <AppSheet modal open={open} onOpenChange={handleClose}>
      <AppSheetContent>
        <form onSubmit={formAddProduct.handleSubmit}>
          <AppCard className="border-none">
            <AppCardHeader className="p-0">
              <AppCardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Agregar un nuevo producto
              </AppCardTitle>
              <AppCardDescription>
                Complete los datos del nuevo producto
              </AppCardDescription>
            </AppCardHeader>
          </AppCard>
          <AppSeparator className="my-4" />

          <div className="gap-4 flex flex-col">
            <AppInputForm
              type="input"
              id="productName"
              label="Nombre del Producto"
              icon={Package}
              required
              placeholder="Nombre del producto"
              value={formAddProduct.values.productName}
              onChange={formAddProduct.handleChange}
            />

            <AppInputForm
              type="input"
              id="productDescription"
              label="Descripción"
              icon={FileText}
              placeholder="Descripción del producto"
              value={formAddProduct.values.productDescription}
              onChange={formAddProduct.handleChange}
            />

            <AppInputForm
              type="input"
              id="productCategory"
              label="Categoría"
              icon={Package}
              placeholder="Categoría del producto"
              value={formAddProduct.values.productCategory}
              onChange={formAddProduct.handleChange}
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
              Agregar Producto
            </AppButton>
          </div>
        </form>
      </AppSheetContent>
    </AppSheet>
  );
}
