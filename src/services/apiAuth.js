import supabase from './supabase';

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
