import { useFormik } from "formik";
import { useState } from "react";
import {
  Scale,
  Truck,
  User,
  Package,
  CreditCard,
  FileText,
  Users,
  Building,
  Edit3,
  Check,
  X,
} from "lucide-react";
import {
  AppCard,
  AppCardContent,
  AppCardDescription,
  AppCardHeader,
  AppCardTitle,
  AppInput,
  AppLabel,
  AppButton,
  AppSelect,
  AppSelectContent,
  AppSelectItem,
  AppSelectTrigger,
  AppSelectValue,
  AppBadge,
  AppSeparator,
  AppStepper,
  AppStepperStep,
  AppStepperStepIndicator,
  AppStepperStepTitle,
  AppStepperStepDescription,
  AppStepperSeparator,
} from "@/common/components/ui";
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
    actions: {
      handleRegisterClick,
      updateStep,
      resetWeights,
      editTare,
      editGrossWeight,
      editNetWeight,
    },
    values: { grossWeight, netWeight, tare, weight, step },
  } = useReaderScreen();

  // Estados para controlar la edición
  const [editingWeight, setEditingWeight] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const startEditing = (weightType: string, currentValue: number) => {
    setEditingWeight(weightType);
    setEditValue(currentValue.toString());
  };

  const cancelEditing = () => {
    setEditingWeight(null);
    setEditValue("");
  };

  const saveEdit = (weightType: string) => {
    const numValue = parseFloat(editValue);
    if (isNaN(numValue) || numValue < 0) {
      alert("Por favor ingrese un valor numérico válido");
      return;
    }

    switch (weightType) {
      case "tare":
        editTare(numValue);
        break;
      case "gross":
        editGrossWeight(numValue);
        break;
      case "net":
        editNetWeight(numValue);
        break;
    }

    setEditingWeight(null);
    setEditValue("");
  };

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

  const getStepNumber = () => {
    switch (step) {
      case "tare":
        return 1;
      case "gross":
        return 2;
      case "net":
        return 3;
      case "form":
        return 4;
      default:
        return 1;
    }
  };

  const getCurrentStepNumber = () => getStepNumber();

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
        <AppCard className="border shadow-lg animate-in slide-in-from-top-4 duration-500">
          <AppCardHeader className="pb-3">
            <AppCardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Estado de la Balanza
            </AppCardTitle>
          </AppCardHeader>
          <AppCardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary font-mono tracking-tight">
                  {weight ? weight.getValue() : "---"}
                </div>
                <div className="text-sm text-muted-foreground">
                  Peso Actual (kg)
                </div>
              </div>
              <div className="text-center">
                <AppBadge
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
                </AppBadge>
                <div className="text-sm text-muted-foreground mt-1">Estado</div>
              </div>
            </div>
          </AppCardContent>
        </AppCard>

        {/* Stepper del Proceso */}
        <AppCard className="animate-in slide-in-from-top-5 duration-700">
          <AppCardHeader>
            <AppCardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Proceso de Pesaje
            </AppCardTitle>
            <AppCardDescription>
              Siga los pasos para completar el registro
            </AppCardDescription>
          </AppCardHeader>
          <AppCardContent>
            <AppStepper currentStep={getCurrentStepNumber()} totalSteps={4} className="mb-6">
              <AppStepperStep step={1}>
                <AppStepperStepIndicator step={1} />
                <div className="ml-3">
                  <AppStepperStepTitle>Registrar Tara</AppStepperStepTitle>
                  <AppStepperStepDescription>
                    Pese el vehículo vacío
                  </AppStepperStepDescription>
                </div>
              </AppStepperStep>
              <AppStepperSeparator />
              <AppStepperStep step={2}>
                <AppStepperStepIndicator step={2} />
                <div className="ml-3">
                  <AppStepperStepTitle>Registrar Peso Bruto</AppStepperStepTitle>
                  <AppStepperStepDescription>
                    Pese el vehículo cargado
                  </AppStepperStepDescription>
                </div>
              </AppStepperStep>
              <AppStepperSeparator />
              <AppStepperStep step={3}>
                <AppStepperStepIndicator step={3} />
                <div className="ml-3">
                  <AppStepperStepTitle>Calcular Peso Neto</AppStepperStepTitle>
                  <AppStepperStepDescription>
                    Verificar cálculo automático
                  </AppStepperStepDescription>
                </div>
              </AppStepperStep>
              <AppStepperSeparator />
              <AppStepperStep step={4}>
                <AppStepperStepIndicator step={4} />
                <div className="ml-3">
                  <AppStepperStepTitle>Completar Formulario</AppStepperStepTitle>
                  <AppStepperStepDescription>
                    Ingresar datos y finalizar
                  </AppStepperStepDescription>
                </div>
              </AppStepperStep>
            </AppStepper>

            {/* Botón de acción principal */}
            <div className="space-y-4">
              {step !== "form" && (
                <AppButton
                  onClick={handleRegisterClick}
                  disabled={
                    step === "net" 
                      ? false 
                      : !weight || !weight.isStableWeight()
                  }
                  size="lg"
                  className="w-full transition-all duration-200 hover:scale-[1.02]"
                >
                  {step === "tare" && "Registrar Tara"}
                  {step === "gross" && "Registrar Peso Bruto"}
                  {step === "net" && "Continuar al Formulario"}
                </AppButton>
              )}

              {/* Resumen de pesos registrados */}
              <div className="grid grid-cols-3 gap-4 text-center">
                {/* Tara */}
                <div className="p-4 bg-secondary rounded-lg border transition-all duration-200 hover:bg-secondary/80 hover:-translate-y-0.5 hover:shadow-md animate-in fade-in-50 duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-muted-foreground">
                      Tara (kg)
                    </div>
                    {tare.getValue() > 0 && (
                      <AppButton
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => startEditing("tare", tare.getValue())}
                        disabled={editingWeight !== null}
                      >
                        <Edit3 className="h-3 w-3" />
                      </AppButton>
                    )}
                  </div>
                  {editingWeight === "tare" ? (
                    <div className="space-y-2">
                      <AppInput
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="text-center"
                        placeholder="0"
                        step="0.1"
                        min="0"
                      />
                      <div className="flex gap-1 justify-center">
                        <AppButton
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => saveEdit("tare")}
                        >
                          <Check className="h-3 w-3 text-green-600" />
                        </AppButton>
                        <AppButton
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={cancelEditing}
                        >
                          <X className="h-3 w-3 text-red-600" />
                        </AppButton>
                      </div>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold font-mono text-foreground">
                      {tare.getValue()}
                    </div>
                  )}
                </div>

                {/* Peso Bruto */}
                <div className="p-4 bg-secondary rounded-lg border transition-all duration-200 hover:bg-secondary/80 hover:-translate-y-0.5 hover:shadow-md animate-in fade-in-50 duration-500">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-muted-foreground">
                      Peso Bruto (kg)
                    </div>
                    {grossWeight.getValue() > 0 && (
                      <AppButton
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() =>
                          startEditing("gross", grossWeight.getValue())
                        }
                        disabled={editingWeight !== null}
                      >
                        <Edit3 className="h-3 w-3" />
                      </AppButton>
                    )}
                  </div>
                  {editingWeight === "gross" ? (
                    <div className="space-y-2">
                      <AppInput
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="text-center"
                        placeholder="0"
                        step="0.1"
                        min="0"
                      />
                      <div className="flex gap-1 justify-center">
                        <AppButton
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => saveEdit("gross")}
                        >
                          <Check className="h-3 w-3 text-green-600" />
                        </AppButton>
                        <AppButton
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={cancelEditing}
                        >
                          <X className="h-3 w-3 text-red-600" />
                        </AppButton>
                      </div>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold font-mono text-foreground">
                      {grossWeight.getValue()}
                    </div>
                  )}
                </div>

                {/* Peso Neto */}
                <div className="p-4 bg-secondary rounded-lg border transition-all duration-200 hover:bg-secondary/80 hover:-translate-y-0.5 hover:shadow-md animate-in fade-in-50 duration-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-muted-foreground">
                      Peso Neto (kg)
                    </div>
                    {netWeight.getValue() > 0 && (
                      <AppButton
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() =>
                          startEditing("net", netWeight.getValue())
                        }
                        disabled={editingWeight !== null}
                      >
                        <Edit3 className="h-3 w-3" />
                      </AppButton>
                    )}
                  </div>
                  {editingWeight === "net" ? (
                    <div className="space-y-2">
                      <AppInput
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="text-center"
                        placeholder="0"
                        step="0.1"
                        min="0"
                      />
                      <div className="flex gap-1 justify-center">
                        <AppButton
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => saveEdit("net")}
                        >
                          <Check className="h-3 w-3 text-green-600" />
                        </AppButton>
                        <AppButton
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={cancelEditing}
                        >
                          <X className="h-3 w-3 text-red-600" />
                        </AppButton>
                      </div>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-primary font-mono">
                      {netWeight.getValue()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </AppCardContent>
        </AppCard>

        {/* Formulario de Datos - Solo visible cuando los pesos están completos */}
        {step === "form" && (
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
                    <div className="space-y-2">
                      <AppLabel
                        htmlFor="patente"
                        className="flex items-center gap-2"
                      >
                        <Truck className="h-4 w-4" />
                        Patente *
                      </AppLabel>
                      <AppInput
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
                      <AppLabel
                        htmlFor="chofer"
                        className="flex items-center gap-2"
                      >
                        <User className="h-4 w-4" />
                        Chofer
                      </AppLabel>
                      <AppInput
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
                    <AppLabel
                      htmlFor="transporte"
                      className="flex items-center gap-2"
                    >
                      <Building className="h-4 w-4" />
                      Empresa de Transporte
                    </AppLabel>
                    <AppInput
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

                <AppSeparator className="my-6" />

                {/* Información Comercial */}
                <div className="animate-in fade-in-50 duration-700">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Información Comercial
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <AppLabel
                        htmlFor="cliente"
                        className="flex items-center gap-2"
                      >
                        <Users className="h-4 w-4" />
                        Cliente *
                      </AppLabel>
                      <AppInput
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
                      <AppLabel
                        htmlFor="producto"
                        className="flex items-center gap-2"
                      >
                        <Package className="h-4 w-4" />
                        Producto *
                      </AppLabel>
                      <AppInput
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
                      <AppLabel
                        htmlFor="tipoCuenta"
                        className="flex items-center gap-2"
                      >
                        <CreditCard className="h-4 w-4" />
                        Tipo de Cuenta *
                      </AppLabel>
                      <AppSelect
                        value={formik.values.tipoCuenta}
                        onValueChange={(value) =>
                          formik.setFieldValue("tipoCuenta", value)
                        }
                      >
                        <AppSelectTrigger
                          className={`transition-all duration-200 ${
                            formik.touched.tipoCuenta && formik.errors.tipoCuenta
                              ? "border-destructive focus:ring-destructive/20"
                              : "focus:ring-primary/20"
                          }`}
                        >
                          <AppSelectValue placeholder="Seleccionar tipo" />
                        </AppSelectTrigger>
                        <AppSelectContent>
                          <AppSelectItem value="contado">Contado</AppSelectItem>
                          <AppSelectItem value="credito">Crédito</AppSelectItem>
                          <AppSelectItem value="prepago">Prepago</AppSelectItem>
                        </AppSelectContent>
                      </AppSelect>
                      {formik.touched.tipoCuenta && formik.errors.tipoCuenta && (
                        <p className="text-sm text-destructive animate-in slide-in-from-left-2 duration-300">
                          {formik.errors.tipoCuenta}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <AppLabel
                        htmlFor="orden"
                        className="flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Número de Orden
                      </AppLabel>
                      <AppInput
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
                  <AppButton
                    type="submit"
                    disabled={!formik.isValid}
                    size="lg"
                    className="w-full transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100"
                  >
                    Completar Registro
                  </AppButton>
                </div>
              </form>
            </AppCardContent>
          </AppCard>
        )}
      </div>
    </div>
  );
}
