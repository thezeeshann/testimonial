import {
  Html,
  Preview,
  Button,
  Head,
  Body,
  Section,
  Container,
  Text,
  Heading,
} from "@react-email/components";

type EmailTemplateProp = {
  url: string;
};

export function Email({ url }: EmailTemplateProp) {
  return (
    <Html>
      <Head />
      <Preview>Testimonial Email Verification</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={upperSection}>
              <Heading style={h1}>Verify your email address</Heading>
              <Text style={verifyText}>
                Follow this link to verify your email address.
              </Text>
              <Button style={buttonStyle} href={url}>Click me</Button>

              <Section style={lowerSection}>
                <Text style={cautionText}>
                  If you didn’t ask to verify this address, you can ignore this
                  email.
                </Text>
                <Text style={cautionText}>Thanks,</Text>

                <Text style={cautionText}>Your Testimonial</Text>
              </Section>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default Email;

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
};


const buttonStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};


const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const verifyText = {
  ...text,
  margin: 0,
  fontWeight: "bold",
  textAlign: "center" as const,
};

const cautionText = { ...text, margin: "0px" };
