import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/plain_variables")({
  component: RouteComponent,
});

function RouteComponent() {
  const [count, setCount] = useState(0);
  const plainArrayVariable = ["foo", "bar"];

  const plainObjectVariable = {
    foo: "foo",
    bar: "bar",
  };

  const plainStringVariable = "foobar";

  const { data: plainArrayVariableData } = useQuery({
    queryKey: ["plain_variables_example", plainArrayVariable],
    queryFn: () => Promise.resolve(plainArrayVariable),
  });

  const { data: plainStringVariableData } = useQuery({
    queryKey: ["plain_variables_string_example", plainStringVariable],
    queryFn: () => Promise.resolve(plainStringVariable),
  });

  // vai ser executado sempre que o count mudar
  useEffect(() => {
    console.log("plainArrayVariable changed", plainArrayVariable);
  }, [plainArrayVariable]);

  // vai ser executado sempre que o count mudar
  useEffect(() => {
    console.log("plainObjectVariable changed", plainObjectVariable);
  }, [plainObjectVariable]);

  // NÃO vai ser executado sempre que o count mudar, porém vai ser recriado
  useEffect(() => {
    console.log("plainStringVariable changed", plainStringVariable);
  }, [plainStringVariable]);

  // por conta da natureza do useQuery, o useEffect não vai ser executado sempre que o count mudar
  useEffect(() => {
    console.log("plainArrayVariableData changed");
  }, [plainArrayVariableData]);

  useEffect(() => {
    console.log("plainStringVariableData changed");
  }, [plainStringVariableData]);

  return (
    <div>
      <h1>Plain variables example</h1>
      <h3>Count is: {count}</h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
