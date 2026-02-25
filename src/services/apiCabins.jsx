import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cannot load Cabins Data");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cannot delete Cabins Data");
  }
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, Number(id));

  // Checking Image new or old
  const hasImagePath = typeof newCabin.image === "string" ? true : false;
  console.log("hasImagePath", hasImagePath);

  const imageName = `${newCabin?.image?.name}-${Math.random()}`;
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");
  // Create Cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // Edit Cabin
  if (id) {
    const test = await supabase.from("cabins").select("*").eq("id", id);

    console.log("Check cabin:", test.data);
    console.log(newCabin, imagePath, id);

    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select();
  console.log(data);

  if (error) {
    console.log(error);
    throw new Error("Cannot create Cabins Data");
  }

  // Upload File
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin?.image);

  if (storageError) {
    // Deleting the recent cabin
    await supabase.from("cabins").delete().eq("id", data?.id);
    throw new Error("Cannot Upload File, Cabin Deleted");
  }

  return data;
}
