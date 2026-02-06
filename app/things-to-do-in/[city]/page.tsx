import ClientPage from "./ClientPage";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = { params: { city: string } };

function normalizeCity(slug: string) {
  const raw = decodeURIComponent(slug ?? "").trim();
  const spaced = raw ? raw.replace(/-/g, " ") : "stockholm";
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export default function Page({ params }: { params: { city: string } }) {
  const city = normalizeCity(params.city);

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 8,
          left: 8,
          zIndex: 9999,
          background: "rgba(255,0,0,0.2)",
          border: "1px solid rgba(255,0,0,0.6)",
          padding: "6px 10px",
          borderRadius: 8,
          color: "white",
          fontSize: 12,
        }}
      >
        SERVER PARAM city: {params.city} → {city}
      </div>
      <div>RAW: {JSON.stringify(params)}</div>

      <ClientPage city={city} />
    </div>
  );
}
