import { Card, CardBody, Chip, Divider } from "@heroui/react";
import { backendTech, frontendTech } from "./tech.constant";

export default function Tech() {
  return (
    <section className="max-w-screen-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Tech-Used</h1>

      <Divider className="mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card shadow="sm" radius="lg">
          <CardBody className="bg-default-100 rounded-lg">
            <h2 className="text-lg font-semibold text-primary mb-4">
              Frontend
            </h2>

            <div className="space-y-4">
              {frontendTech.map((tech) => (
                <div key={tech.name} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{tech.name}</p>
                    <Chip size="sm" variant="flat" color="primary">
                      Frontend
                    </Chip>
                  </div>
                  <p className="text-sm text-default-500">{tech.desc}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card shadow="sm" radius="lg">
          <CardBody className="bg-default-100 rounded-lg">
            <h2 className="text-lg font-semibold text-success mb-4">Backend</h2>

            <div className="space-y-4">
              {backendTech.map((tech) => (
                <div key={tech.name} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{tech.name}</p>
                    <Chip size="sm" variant="flat" color="success">
                      Backend
                    </Chip>
                  </div>
                  <p className="text-sm text-default-500">{tech.desc}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
