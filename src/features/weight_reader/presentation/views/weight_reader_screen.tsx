import { useFormik } from "formik";
import {
  Scale,
  Truck,
  User,
  Package,
  CreditCard,
  FileText,
  Users,
  Building,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useReaderScreen } from "../hooks/use_reader_screen";

interface WeightFormData {
  patente: string;
  cliente: string;
  producto: string;
  tipoCuenta: string;
  orden: string;
  chofer: string;
  transporte: string;
}

export default function WeightReaderScreen() {
  const {
    actions: { handleRegisterClick, updateStep, resetWeights },
    values: { grossWeight, netWeight, tare, weight, step },
  } = useReaderScreen();

  const formik = useFormik<WeightFormData>({
    initialValues: {
      patente: "",
      cliente: "",
      producto: "",
      tipoCuenta: "",
      orden: "",
      chofer: "",
      transporte: "",
    },
    onSubmit: (values) => {
      const registroCompleto = {
        ...values,
        tare: tare.getValue(),
        grossWeight: grossWeight.getValue(),
        netWeight: netWeight.getValue(),
        timestamp: new Date().toISOString(),
      };
      console.log("Registro completo:", registroCompleto);
      formik.resetForm();
      resetWeights();
      updateStep("tare");
    },
    validate: (values) => {
      const errors: Partial<WeightFormData> = {};
      if (!values.patente) errors.patente = "La patente es requerida";
      if (!values.cliente) errors.cliente = "El cliente es requerido";
      if (!values.producto) errors.producto = "El producto es requerido";
      if (!values.tipoCuenta)
        errors.tipoCuenta = "El tipo de cuenta es requerido";
      return errors;
    },
  });

  const getStepInfo = () => {
    switch (step) {
      case "tare":
        return { label: "Registrar Tara", number: 1, total: 3 };
      case "gross":
        return { label: "Registrar Peso Bruto", number: 2, total: 3 };
      case "net":
        return { label: "Proceso Completado", number: 3, total: 3 };
      default:
        return { label: "", number: 1, total: 3 };
    }
  };

  const stepInfo = getStepInfo();

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 py-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Scale className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Sistema de Pesaje
            </h1>
            <p className="text-muted-foreground">
              Registro y control de pesadas
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid gap-6">
        {/* Estado Actual de la Balanza */}
        <Card className="border shadow-lg animate-in slide-in-from-top-4 duration-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Estado de la Balanza
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary font-mono tracking-tight">
                  {weight ? weight.getValue() : "---"}
                </div>
                <div className="text-sm text-muted-foreground">
                  Peso Actual (kg)
                </div>
              </div>
              <div className="text-center">
                <Badge
                  variant={
                    weight && weight.isStableWeight()
                      ? "default"
                      : "destructive"
                  }
                  className="text-sm"
                >
                  {weight && weight.isStableWeight()
                    ? "🟢 Estable"
                    : "🔴 Inestable"}
                </Badge>
                <div className="text-sm text-muted-foreground mt-1">Estado</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium">
                  Paso {stepInfo.number} de {stepInfo.total}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stepInfo.label}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Proceso de Pesaje */}
        <Card className="animate-in slide-in-from-top-5 duration-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Proceso de Pesaje
            </CardTitle>
            <CardDescription>
              Registre los pesos en el orden indicado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                onClick={handleRegisterClick}
                disabled={!weight || !weight.isStableWeight() || step === "net"}
                size="lg"
                className="w-full transition-all duration-200 hover:scale-[1.02]"
              >
                {step === "net" ? "Proceso Completado" : "Registrar Peso"}
              </Button>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-secondary rounded-lg border transition-all duration-200 hover:bg-secondary/80 hover:-translate-y-0.5 hover:shadow-md animate-in fade-in-50 duration-300">
                  <div className="text-2xl font-bold font-mono text-foreground">
                    {tare.getValue()}
                  </div>
                  <div className="text-sm text-muted-foreground">Tara (kg)</div>
                </div>
                <div className="p-4 bg-secondary rounded-lg border transition-all duration-200 hover:bg-secondary/80 hover:-translate-y-0.5 hover:shadow-md animate-in fade-in-50 duration-500">
                  <div className="text-2xl font-bold font-mono text-foreground">
                    {grossWeight.getValue()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Peso Bruto (kg)
                  </div>
                </div>
                <div className="p-4 bg-secondary rounded-lg border transition-all duration-200 hover:bg-secondary/80 hover:-translate-y-0.5 hover:shadow-md animate-in fade-in-50 duration-700">
                  <div className="text-2xl font-bold text-primary font-mono">
                    {netWeight.getValue()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Peso Neto (kg)
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulario de Datos */}
        <Card className="animate-in slide-in-from-bottom-4 duration-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Información del Registro
            </CardTitle>
            <CardDescription>
              Complete los datos del vehículo y la carga
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Información del Vehículo */}
              <div className="animate-in fade-in-50 duration-500">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Vehículo
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="patente"
                      className="flex items-center gap-2"
                    >
                      <Truck className="h-4 w-4" />
                      Patente *
                    </Label>
                    <Input
                      id="patente"
                      name="patente"
                      placeholder="ABC-123"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.patente}
                      className={`transition-all duration-200 ${
                        formik.touched.patente && formik.errors.patente
                          ? "border-destructive focus:ring-destructive/20"
                          : "focus:ring-primary/20"
                      }`}
                    />
                    {formik.touched.patente && formik.errors.patente && (
                      <p className="text-sm text-destructive animate-in slide-in-from-left-2 duration-300">
                        {formik.errors.patente}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chofer" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Chofer
                    </Label>
                    <Input
                      id="chofer"
                      name="chofer"
                      placeholder="Nombre del chofer"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.chofer}
                      className="transition-all duration-200 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Label
                    htmlFor="transporte"
                    className="flex items-center gap-2"
                  >
                    <Building className="h-4 w-4" />
                    Empresa de Transporte
                  </Label>
                  <Input
                    id="transporte"
                    name="transporte"
                    placeholder="Nombre de la empresa"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.transporte}
                    className="mt-2 transition-all duration-200 focus:ring-primary/20"
                  />
                </div>
              </div>

              <Separator className="my-6" />

              {/* Información Comercial */}
              <div className="animate-in fade-in-50 duration-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Información Comercial
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="cliente"
                      className="flex items-center gap-2"
                    >
                      <Users className="h-4 w-4" />
                      Cliente *
                    </Label>
                    <Input
                      id="cliente"
                      name="cliente"
                      placeholder="Nombre del cliente"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cliente}
                      className={`transition-all duration-200 ${
                        formik.touched.cliente && formik.errors.cliente
                          ? "border-destructive focus:ring-destructive/20"
                          : "focus:ring-primary/20"
                      }`}
                    />
                    {formik.touched.cliente && formik.errors.cliente && (
                      <p className="text-sm text-destructive animate-in slide-in-from-left-2 duration-300">
                        {formik.errors.cliente}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="producto"
                      className="flex items-center gap-2"
                    >
                      <Package className="h-4 w-4" />
                      Producto *
                    </Label>
                    <Input
                      id="producto"
                      name="producto"
                      placeholder="Tipo de producto"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.producto}
                      className={`transition-all duration-200 ${
                        formik.touched.producto && formik.errors.producto
                          ? "border-destructive focus:ring-destructive/20"
                          : "focus:ring-primary/20"
                      }`}
                    />
                    {formik.touched.producto && formik.errors.producto && (
                      <p className="text-sm text-destructive animate-in slide-in-from-left-2 duration-300">
                        {formik.errors.producto}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="tipoCuenta"
                      className="flex items-center gap-2"
                    >
                      <CreditCard className="h-4 w-4" />
                      Tipo de Cuenta *
                    </Label>
                    <Select
                      value={formik.values.tipoCuenta}
                      onValueChange={(value) =>
                        formik.setFieldValue("tipoCuenta", value)
                      }
                    >
                      <SelectTrigger
                        className={`transition-all duration-200 ${
                          formik.touched.tipoCuenta && formik.errors.tipoCuenta
                            ? "border-destructive focus:ring-destructive/20"
                            : "focus:ring-primary/20"
                        }`}
                      >
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contado">Contado</SelectItem>
                        <SelectItem value="credito">Crédito</SelectItem>
                        <SelectItem value="prepago">Prepago</SelectItem>
                      </SelectContent>
                    </Select>
                    {formik.touched.tipoCuenta && formik.errors.tipoCuenta && (
                      <p className="text-sm text-destructive animate-in slide-in-from-left-2 duration-300">
                        {formik.errors.tipoCuenta}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="orden" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Número de Orden
                    </Label>
                    <Input
                      id="orden"
                      name="orden"
                      placeholder="Número de orden"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.orden}
                      className="transition-all duration-200 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              {/* Botón de Envío */}
              <div className="pt-6 animate-in fade-in-50 duration-1000">
                <Button
                  type="submit"
                  disabled={!formik.isValid || step !== "net"}
                  size="lg"
                  className="w-full transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100"
                >
                  {step !== "net"
                    ? "Complete el proceso de pesaje"
                    : "Completar Registro"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
