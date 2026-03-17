import { BsBucket } from 'react-icons/bs';
import supabase, { supabaseUrl } from './supabase';

export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error('Cannot Login');
  }

  console.log('data', data);

  //   await new Promise((resolve) => setTimeout(resolve, 3000));
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  console.log(session);

  if (!session?.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  console.log(data);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  // 1.) TO update user details
  let objToUpdata;

  if (fullName) objToUpdata = { data: { fullName } };
  if (password) objToUpdata = { password };

  console.log('objToUpdate', objToUpdata);

  const { data, error } = await supabase.auth.updateUser(objToUpdata);

  if (error) {
    throw new Error(error.message);
  }
  console.log('data', data);
  console.log('avatar', avatar);

  if (!avatar) return data.user;

  // 2.)Storre Avatar to Supabase Bucket
  const filename = `avatar-${data?.user?.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(filename, avatar);

  if (storageError) {
    console.log('storageError', storageError);

    throw new Error(storageError.message);
  }

  // 3.) Update Avatar to Userdata;
  const { data: updateUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${filename}`,
    },
  });

  if (error2) {
    throw new Error(error2.message);
  }

  console.log('updateUser', updateUser);

  return updateUser.user;
}
