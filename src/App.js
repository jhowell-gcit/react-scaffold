import { useState } from "react";
import "./App.css";
import theme from "./theme";
import { ApiService } from "./services/api/api-services";
import { useFormik } from "formik";
import * as yup from "yup";
import { ThemeProvider, CssBaseline, Box, Button, TextField } from "@mui/material";

const validationSchema = yup.object({
  code: yup
    .string()
    .test(
      "oneOfRequired",
      " ",
      (item, testContext) => {
        return (testContext.parent.code || testContext.parent.name)
      }
    ),
  name: yup
    .string()
    .test(
      "oneOfRequired",
      "sampleCode or sampleName must be provided",
      (item, testContext) => {
        return (testContext.parent.code || testContext.parent.name)
      }
    ),
});

function App() {
  const formik = useFormik({
    initialValues: {
      code: "",
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      ApiService.getRequest(values.code, values.name).then((res) => {
        if (res.status === 200) {
          setResErr(false)
        } else {
          setResErr(true)
        }
        formik.setFieldValue("code", "");
        formik.setFieldValue("name", "");
        formik.setTouched({}, false);
        setMessage(JSON.stringify(res.data, null, 2));
      });
    },
  });

  const [message, setMessage] = useState("");
  const [resErr, setResErr] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="App">
        <form onSubmit={formik.handleSubmit}>
          <Box>
            <TextField
              id="code"
              name="code"
              label="sampleCode"
              sx={{ width: 300 }}
              value={formik.values.code}
              onChange={formik.handleChange}
              error={formik.touched.code && formik.errors.code}
              helperText={(formik.touched.code && formik.errors.code) || " "}
            />
          </Box>
          <Box mt={2}>
            <TextField
              id="name"
              name="name"
              label="sampleName"
              sx={{ width: 300 }}
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && formik.errors.name}
              helperText={(formik.touched.name && formik.errors.name) || " "}
            />
          </Box>
          <Box mt={2}>
            <Button variant="contained" type="submit">GET</Button>
          </Box>
          <Box mt={6}>
            <Box color={resErr ? "error.main" : "success.main"}>{message ? <pre>{message}</pre> : null}</Box>
          </Box>
        </form>
      </Box>
    </ThemeProvider>
  );
}

export default App;