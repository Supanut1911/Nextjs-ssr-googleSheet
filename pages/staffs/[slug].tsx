import { FC } from "react";
import { google } from "googleapis";

//frontend
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
  isNotFound?: boolean;
}

const StaffId: FC<StaffPropsType> = ({
  name,
  role,
  contact,
  linkin,
  line,
  address,
  thumnal_url,
  isNotFound,
}) => {
  if (isNotFound) {
    return <h1>Not found staff</h1>;
  }
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
  //setup - sheet
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  //query slug
  const { slug } = query;

  //fetch all staff
  const rangeAllStaff = `test!A2:A`;
  const allStaff = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: rangeAllStaff,
  });

  //replace " " with "-"
  const allStaffDash = allStaff.data.values.map((staff) =>
    staff.map((s) => s.replace(/\s+/g, "-").toLowerCase())
  );

  const staffArr: string[] = [];

  //find slug idx
  allStaffDash.map((staff) => {
    staffArr.push(...staff);
  });

  const slugIdx = staffArr.findIndex((e) => e === slug);

  // const slugIdx = staff.map(async (s) => {
  // let idx = 0;
  // console.log("🚀 ~ file: [slug].tsx ~ line 85 ~ staff.map ~ s", s);
  // console.log("idx", idx);
  // if (s === slug) {
  //   // console.log("🚀 ~ file: [slug].tsx ~ line 82 ~ staff.map ~ slug", slug);
  //   // console.log(
  //   //   "🚀 ~ file: [slug].tsx ~ line 81 ~ staff.map ~ idx",
  //   //   idx + 2
  //   // );
  //   return idx + 2;
  // } else {
  //   console.log("yoyo");

  //   idx++;
  // }
  // })

  //fetch staffby slugIdx
  // const staffIdx = await slugIdx[0][0];

  const staffIdx = slugIdx + 2;
  const range = `test!A${staffIdx}:G${staffIdx}`;
  let fetchStaffBySlugIdx;

  try {
    fetchStaffBySlugIdx = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: range,
    });

    const [name, role, address, contact, linkin, line, thumnal_url] =
      fetchStaffBySlugIdx.data.values[0];

    if (name === "name" || null || undefined) {
      return {
        props: {
          isNotFound: true,
        },
      };
    }

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
  } catch (error) {
    return {
      props: {
        isNotFound: true,
      },
    };
  }
};
