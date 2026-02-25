import supabase, { supabaseUrl } from "./supabase";

export  async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cannot load Cabins Data");
  }

  return data;
}

export async function deleteCabin(id) {
const { error } = await supabase
  .from('cabins')
  .delete()
  .eq('id', id)
  
 if (error) {
    console.log(error);
    throw new Error("Cannot delete Cabins Data");
  }
}


export async function createEditCabin(newCabin, id) {

  console.log(newCabin, id);
  const hasImagepath = newCabin.image?.startsWith?.(supabaseUrl);


  // 1.) Create Cabin
  const imageName = `${Math.random()}-${newCabin?.image?.name?.replaceAll("/", "")}`;
  const imagePath =  hasImagepath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  let query = supabase.from('cabins');

  // A Create
  if(!id) query = query.insert([{ ...newCabin, image: imagePath }])


  // B Edit
  if(id) query = query.update({ ...newCabin, image: imagePath})
  .eq('id', id)

  const { data, error } = await query.select().single();
 
   if (error) {
    console.log(error);
    throw new Error("Cannot create Cabins Data");
  }


  if (hasImagepath) return data; // No need to upload Same image again

  // 2.) Uploading File
  const { error: storageError } = await supabase.storage
  .from('cabin-images')
    .upload(imageName, newCabin?.image)
  
    if (storageError) {
      console.log(storageError);
      
      const { error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', data.id);
      
    if (error) {
    console.log(error);
    throw new Error("Cannot delete Cabins Data");
  }

    throw new Error("Cannot Upload image, Cabin was deleted");
  }
  return data
}



