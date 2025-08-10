import { useFormik } from "formik";
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

const WeightReaderScreen = () => {
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
      // Aquí puedes manejar el envío final de todos los datos
      const registroCompleto = {
        ...values,
        tare: tare.getValue(),
        grossWeight: grossWeight.getValue(),
        netWeight: netWeight.getValue(),
        timestamp: new Date().toISOString(),
      };

      console.log("Registro completo:", registroCompleto);
      // Aquí podrías enviar los datos a una API o base de datos

      // Resetear el formulario y los pesos
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

  const getStepLabel = () => {
    switch (step) {
      case "tare":
        return "1. Registrar Tara";
      case "gross":
        return "2. Registrar Peso Bruto";
      default:
        return "";
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Weight Reader</h1>

      {/* Información del peso actual */}
      <div>
        <p>
          <strong>Peso Actual:</strong>{" "}
          {weight ? weight.getValue() : "Loading..."} kg
        </p>
        <p>
          <strong>Estado:</strong>{" "}
          {weight && weight.isStableWeight() ? "🟢 Estable" : "🔴 Inestable"}
        </p>
        <p>
          <strong>Paso:</strong> {getStepLabel()}
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "0.5px",
          margin: "20px 0",
        }}
      />

      {/* Sección de registro de pesos */}
      <section>
        <h3>Proceso de Pesaje</h3>
        <div style={{ marginBottom: "15px" }}>
          <button
            type="button"
            disabled={!weight || !weight.isStableWeight() || step === "net"}
            onClick={handleRegisterClick}
          >
            Registrar
          </button>
        </div>

        <div>
          <div>
            <strong>Tara:</strong> {tare.getValue()} kg
          </div>
          <div>
            <strong>Peso Bruto:</strong> {grossWeight.getValue()} kg
          </div>
          <div>
            <strong>Peso Neto:</strong> {netWeight.getValue()} kg
          </div>
        </div>
      </section>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "0.5px",
          margin: "20px 0",
        }}
      />

      <form onSubmit={formik.handleSubmit}>
        {/* Campos del formulario */}
        <div>
          <div>
            <label htmlFor="patente">Patente *</label>
            <input
              id="patente"
              name="patente"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.patente}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
            {formik.touched.patente && formik.errors.patente && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.patente}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="cliente">Cliente *</label>
            <input
              id="cliente"
              name="cliente"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cliente}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
            {formik.touched.cliente && formik.errors.cliente && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.cliente}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="producto">Producto *</label>
            <input
              id="producto"
              name="producto"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.producto}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
            {formik.touched.producto && formik.errors.producto && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.producto}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="tipoCuenta">Tipo de Cuenta *</label>
            <select
              id="tipoCuenta"
              name="tipoCuenta"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tipoCuenta}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            >
              <option value="">Seleccionar tipo</option>
              <option value="contado">Contado</option>
              <option value="credito">Crédito</option>
              <option value="prepago">Prepago</option>
            </select>
            {formik.touched.tipoCuenta && formik.errors.tipoCuenta && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.tipoCuenta}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="orden">Orden</label>
            <input
              id="orden"
              name="orden"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.orden}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          <div>
            <label htmlFor="chofer">Chofer</label>
            <input
              id="chofer"
              name="chofer"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.chofer}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label htmlFor="transporte">Transporte</label>
            <input
              id="transporte"
              name="transporte"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.transporte}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
        </div>

        {/* Botón de envío final */}
        <div style={{ textAlign: "center" }}>
          <button type="submit" disabled={!formik.isValid}>
            Completar Registro
          </button>
        </div>
      </form>
    </div>
  );
};

export default WeightReaderScreen;
