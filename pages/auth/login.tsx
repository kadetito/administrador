import { useState, useEffect, useContext } from "react";
import { GetServerSideProps } from "next";
import { signIn, getSession, getProviders } from "next-auth/react";

import { useForm } from "react-hook-form";

import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils";
import { useRouter } from "next/router";
import { Badge, Card, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../context/auth/AuthContext";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const { loginUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  console.log("formState", errors);
  const [showError, setShowError] = useState(false);

  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((prov) => {
      // console.log({prov});
      setProviders(prov);
    });
  }, []);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    const isValidLogin = await loginUser(email, password);
    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    // // Todo: navegar a la pantalla que el usuario estaba
    // const destination = router.query.p?.toString() || '/';
    // router.replace(destination);

    await signIn("credentials", { email, password });
  };

  return (
    <AuthLayout title={"Ingresar"}>
      <Card>
        <Card.Body>
          <form onSubmit={handleSubmit(onLoginUser)} noValidate>
            <Row className="mb-2">
              <Col xs={12}>
                <h1>Iniciar Sesión</h1>

                {showError && (
                  <>
                    <Badge bg="danger">
                      El usuario no existe o la contraseña no es correcta
                    </Badge>
                  </>
                )}
              </Col>
            </Row>
            <Row className="mt-2 mb-3">
              <Col>
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  {...register("email", {
                    required: "Este campo es requerido",
                    validate: validations.isEmail,
                  })}
                />
                {errors.email && <>{errors.email?.message}</>}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  {...register("password", {
                    required: "Este campo es requerido",
                    minLength: { value: 6, message: "Mínimo 6 caracteres" },
                  })}
                />
                {errors.password && <>{errors.password?.message}</>}
              </Col>
            </Row>

            <Row>
              <Col className="d-grid gap-2">
                <Button
                  type="submit"
                  size="lg"
                  color="secondary"
                  className="circular-btn"
                >
                  Ingresar
                </Button>
              </Col>
            </Row>

            <Row>
              <Col>
                {Object.values(providers).map((provider: any) => {
                  if (provider.id === "credentials")
                    return <div key="credentials"></div>;

                  return (
                    <></>
                    // <Button
                    //   key={provider.id}
                    //   variant="outlined"
                    //   color="primary"
                    //   onClick={() => signIn(provider.id)}
                    // >
                    //   {provider.name}
                    // </Button>
                  );
                })}
              </Col>
            </Row>
          </form>
        </Card.Body>
      </Card>
    </AuthLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  // console.log({session});

  const { p = "/admin" } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
