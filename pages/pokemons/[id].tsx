import { FC } from "react";
import { google } from "googleapis";

//front
interface SheetPropsType {
  query: any;
}

interface PokemonPropsType {
  name: string;
  type: string;
  img: string;
}

const PokemonId: FC<PokemonPropsType> = ({ name, type, img }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <div>
          <img src={img} width="500" height="500" />
        </div>
      </div>
      <div>
        <h1>
          {name} : {type}
        </h1>
      </div>
    </div>
  );
};

export default PokemonId;

//backend
export const getServerSideProps = async ({ query }: SheetPropsType) => {
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const { id } = query;
  const range = `Pokedex!A${id}:C${id}`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  const [name, type, img] = response.data.values[0];
  return {
    props: {
      name,
      type,
      img,
    },
  };
};
