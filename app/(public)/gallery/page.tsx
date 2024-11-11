import Image from "next/image";

type GalleryItem = {
  id: number;
  image: {
    medium: string;
  };
};

type Props = {};

async function getData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/gallery/published?page=1`,
      {
        next: {
          revalidate: 180,
        },
      }
    );
    console.log(res, "response");
    if (!res.ok) {
      console.log("error");
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching data mahfuz:", error);
    return { gallery: [] }; // Return a default value if the fetch fails
  }
}

export default async function Page({}: Props) {
  const { gallery }: { gallery: GalleryItem[] } = await getData();
  console.log(gallery, "now photo");
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-slate-300">
      {gallery &&
        gallery.map((item) => (
          <div key={item.id}>
            <Image
              className="h-auto max-w-full rounded-lg"
              src={`${process.env.NEXT_PUBLIC_API_URL}/image/${item.image.medium}`}
              alt="image"
              width={800}
              height={500}
            />
          </div>
        ))}
    </div>
  );
}
