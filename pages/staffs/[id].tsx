import { FC } from "react";
import { google } from "googleapis";

//front
interface SheetPropsType {
  query: any;
}

interface StaffPropsType {
  name: string;
  role: string;
  contact: string;
  address: string;
  linkin: string;
  line: string;
  thumnal_url: string;
}

const StaffId: FC<StaffPropsType> = ({
  name,
  role,
  contact,
  linkin,
  line,
  address,
  thumnal_url,
}) => {
  return (
    <>
      <div>
        <div>
          <img src={thumnal_url} width="500" height="500" />
        </div>
        <span>
          <h1>
            {name} : {role}
          </h1>
          <p>
            {contact} | {linkin} | {line}
          </p>

          <p>{address}</p>
        </span>
      </div>
    </>
  );
};

export default StaffId;

//backend
export const getServerSideProps = async ({ query }: SheetPropsType) => {
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const { id } = query;
  const range = `test!A${id}:G${id}`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  const [name, role, address, contact, linkin, line, thumnal_url] =
    response.data.values[0];
  return {
    props: {
      name,
      role,
      contact,
      address,
      linkin,
      line,
      thumnal_url,
    },
  };
};
