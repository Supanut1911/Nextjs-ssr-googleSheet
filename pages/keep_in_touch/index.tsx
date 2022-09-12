import { FC, FormEvent, useState } from "react";
import { getServerSideProps } from "../pokemons/[id]";

const Index: FC = () => {
  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const form = {
    name,
    nationality,
    email,
    telegram,
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = {
      name,
      nationality,
      email,
      telegram,
    };

    const response = await fetch("/api/publish", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const content = await response.json();
    alert(content.data.tableRange);
    setName("");
  };

  return (
    <>
      <div>
        <div>
          <label>name</label>
          <input
            value={name}
            type="text"
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label>nationality</label>
          <input
            value={nationality}
            type="text"
            id="nationality"
            name="nationality"
            onChange={(e) => setNationality(e.target.value)}
          ></input>
        </div>
        <div>
          <label>email</label>
          <input
            value={email}
            type="text"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label>telegram</label>
          <input
            value={telegram}
            type="text"
            id="telegram"
            name="telegram"
            onChange={(e) => setTelegram(e.target.value)}
          ></input>
        </div>
        <button onClick={handleSubmit}>submit</button>
      </div>
    </>
  );
};

export default Index;
