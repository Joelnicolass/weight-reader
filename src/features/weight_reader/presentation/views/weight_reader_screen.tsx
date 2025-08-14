import { useFormik } from "formik";
import { useReaderScreen } from "../hooks/use_reader_screen";
import { useWeightEdit } from "../hooks/use_weight_edit";
import AppHeader from "../components/AppHeader";
import WeightScaleStatus from "../components/WeightScaleStatus";
import WeightProcessStepper from "../components/WeightProcessStepper";
import WeightDataForm from "../components/WeightDataForm";

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

  // Hook para manejar la edición de pesos
  const {
    editingWeight,
    editValue,
    startEditing,
    cancelEditing,
    saveEdit,
    handleKeyDown,
    setEditValue,
    tareInputRef,
    grossInputRef,
    netInputRef,
  } = useWeightEdit({
    editActions: {
      editTare,
      editGrossWeight,
      editNetWeight,
    },
  });

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

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <AppHeader />

      <div className="max-w-6xl mx-auto grid gap-6">
        <WeightScaleStatus weight={weight} />
        <WeightProcessStepper
          step={step}
          weight={weight}
          tare={tare}
          grossWeight={grossWeight}
          netWeight={netWeight}
          onRegisterClick={handleRegisterClick}
          editingWeight={editingWeight}
          editValue={editValue}
          setEditValue={setEditValue}
          startEditing={startEditing}
          cancelEditing={cancelEditing}
          saveEdit={saveEdit}
          handleKeyDown={handleKeyDown}
          tareInputRef={tareInputRef}
          grossInputRef={grossInputRef}
          netInputRef={netInputRef}
        />
        {step === "form" && <WeightDataForm formik={formik} />}
      </div>
    </div>
  );
}
