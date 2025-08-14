import {
  Truck,
  User,
  Package,
  CreditCard,
  FileText,
  Users,
  Building,
  Plus,
} from "lucide-react";
import {
  AppCard,
  AppCardContent,
  AppCardDescription,
  AppCardHeader,
  AppCardTitle,
  AppButton,
  AppSelectItem,
  AppSeparator,
  AppInputForm,
} from "@/common/components/ui";
import { type FormikProps } from "formik";
import { useState } from "react";
import type { AppComboBoxOption } from "@/common/components/ui";
import NewCustomerSheet from "./NewCustomerSheet";
import NewProductSheet from "./NewProductSheet";

// Mock data - TODO: Replace with backend API calls
const mockClientes: AppComboBoxOption[] = [
  { value: "cliente1", label: "Constructora ABC S.A." },
  { value: "cliente2", label: "Minerales del Sur Ltda." },
  { value: "cliente3", label: "Transportes Unidos S.A." },
  { value: "cliente4", label: "Cementos Andinos" },
  { value: "cliente5", label: "Agregados Pétreos S.A." },
];

const mockTransportes: AppComboBoxOption[] = [
  { value: "transporte1", label: "Logística Express S.A." },
  { value: "transporte2", label: "Transportes Rápidos Ltda." },
  { value: "transporte3", label: "Carga Pesada S.A." },
  { value: "transporte4", label: "Distribuciones del Norte" },
  { value: "transporte5", label: "Flota Nacional S.A." },
];

const mockProductos: AppComboBoxOption[] = [
  { value: "producto1", label: "Arena Gruesa" },
  { value: "producto2", label: 'Gravilla 3/4"' },
  { value: "producto3", label: "Piedra Chancada" },
  { value: "producto4", label: "Arena Fina" },
  { value: "producto5", label: "Ripio" },
  { value: "producto6", label: "Cemento Portland" },
  { value: "producto7", label: "Cal Hidratada" },
  { value: "producto8", label: "Hormigón Premezclado" },
  { value: "producto9", label: "Asfalto" },
  { value: "producto10", label: "Yeso" },
  { value: "producto11", label: "Escoria" },
  { value: "producto12", label: "Tierra Vegetal" },
  { value: "producto13", label: "Bloques de Hormigón" },
  { value: "producto14", label: "Ladrillos" },
  { value: "producto15", label: "Tejas" },
  { value: "producto16", label: "Madera de Construcción" },
  { value: "producto17", label: "Acero de Refuerzo" },
  { value: "producto18", label: "Tubos de PVC" },
  { value: "producto19", label: "Cables Eléctricos" },
  { value: "producto20", label: "Materiales Sanitarios" },
];

interface WeightFormData {
  patente: string;
  cliente: string;
  producto: string;
  tipoCuenta: string;
  orden: string;
  chofer: string;
  transporte: string;
}

interface WeightDataFormProps {
  formik: FormikProps<WeightFormData>;
}

export default function WeightDataForm({ formik }: WeightDataFormProps) {
  const [openSheetNewClient, setOpenSheetNewClient] = useState(false);
  const [openSheetNewProduct, setOpenSheetNewProduct] = useState(false);

  const handleCustomerAdded = (customer: {
    name: string;
    phone: string;
    address: string;
  }) => {
    // TODO: Add the new customer to the options list
    console.log("Cliente agregado:", customer);
  };

  const handleProductAdded = (product: {
    name: string;
    description: string;
    category: string;
  }) => {
    // TODO: Add the new product to the options list
    console.log("Producto agregado:", product);
  };

  return (
    <>
      <NewCustomerSheet
        open={openSheetNewClient}
        onOpenChange={setOpenSheetNewClient}
        onCustomerAdded={handleCustomerAdded}
      />

      <NewProductSheet
        open={openSheetNewProduct}
        onOpenChange={setOpenSheetNewProduct}
        onProductAdded={handleProductAdded}
      />

      <AppCard className="animate-in slide-in-from-bottom-4 duration-700">
        <AppCardHeader>
          <AppCardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Información del Registro
          </AppCardTitle>
          <AppCardDescription>
            Complete los datos del vehículo y la carga
          </AppCardDescription>
        </AppCardHeader>
        <AppCardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Información del Vehículo */}
            <div className="animate-in fade-in-50 duration-500">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Vehículo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AppInputForm
                  type="input"
                  id="patente"
                  label="Patente"
                  icon={Truck}
                  required
                  placeholder="ABC-123"
                  value={formik.values.patente}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.patente}
                  touched={formik.touched.patente}
                />

                <AppInputForm
                  type="input"
                  id="chofer"
                  label="Chofer"
                  icon={User}
                  placeholder="Nombre del chofer"
                  value={formik.values.chofer}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              <div className="mt-4">
                <AppInputForm
                  type="combobox"
                  id="transporte"
                  label="Empresa de Transporte"
                  icon={Building}
                  placeholder="Seleccionar empresa..."
                  searchPlaceholder="Buscar empresa..."
                  emptyMessage="No se encontraron empresas."
                  options={mockTransportes}
                  value={formik.values.transporte}
                  onValueChange={(value) =>
                    formik.setFieldValue("transporte", value)
                  }
                  rightElement={
                    <AppButton
                      type="button"
                      onClick={() => setOpenSheetNewClient(true)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus />
                    </AppButton>
                  }
                />
              </div>
            </div>

            <AppSeparator className="my-6" />

            {/* Información Comercial */}
            <div className="animate-in fade-in-50 duration-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Información Comercial
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AppInputForm
                  type="combobox"
                  id="cliente"
                  label="Cliente"
                  icon={Users}
                  required
                  placeholder="Seleccionar cliente..."
                  searchPlaceholder="Buscar cliente..."
                  emptyMessage="No se encontraron clientes."
                  options={mockClientes}
                  value={formik.values.cliente}
                  onValueChange={(value) =>
                    formik.setFieldValue("cliente", value)
                  }
                  error={formik.errors.cliente}
                  touched={formik.touched.cliente}
                />

                <AppInputForm
                  type="combobox"
                  id="producto"
                  label="Producto"
                  icon={Package}
                  required
                  placeholder="Seleccionar producto..."
                  searchPlaceholder="Buscar producto..."
                  emptyMessage="No se encontraron productos."
                  options={mockProductos}
                  value={formik.values.producto}
                  onValueChange={(value) =>
                    formik.setFieldValue("producto", value)
                  }
                  error={formik.errors.producto}
                  touched={formik.touched.producto}
                  rightElement={
                    <AppButton
                      type="button"
                      onClick={() => setOpenSheetNewProduct(true)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus />
                    </AppButton>
                  }
                />

                <AppInputForm
                  type="select"
                  id="tipoCuenta"
                  label="Tipo de Cuenta"
                  icon={CreditCard}
                  required
                  placeholder="Seleccionar tipo"
                  value={formik.values.tipoCuenta}
                  onValueChange={(value) =>
                    formik.setFieldValue("tipoCuenta", value)
                  }
                  error={formik.errors.tipoCuenta}
                  touched={formik.touched.tipoCuenta}
                >
                  <AppSelectItem value="contado">Contado</AppSelectItem>
                  <AppSelectItem value="credito">Crédito</AppSelectItem>
                  <AppSelectItem value="prepago">Prepago</AppSelectItem>
                </AppInputForm>

                <AppInputForm
                  type="input"
                  id="orden"
                  label="Número de Orden"
                  icon={FileText}
                  placeholder="Número de orden"
                  value={formik.values.orden}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>

            {/* Botón de Envío */}
            <div className="pt-6 animate-in fade-in-50 duration-1000">
              <AppButton
                type="submit"
                disabled={!formik.isValid}
                size="lg"
                className="w-full"
              >
                Completar Registro
              </AppButton>
            </div>
          </form>
        </AppCardContent>
      </AppCard>
    </>
  );
}
