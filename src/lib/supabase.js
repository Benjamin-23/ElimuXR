import {createClient} from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';
import {AppState} from 'react-native';

// Or for Expo projects:
// import * as SecureStore from 'expo-secure-store';

// Your Supabase URL and anon key from the Supabase dashboard
const supabaseUrl = 'https://tarzpiagbrufskvringo.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhcnpwaWFnYnJ1ZnNrdnJpbmdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMTEwMzcsImV4cCI6MjA1MjU4NzAzN30.ziwycfSZFdPVQEyUKPjPYppqHg2JSOiddrWWl92T4Vs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', state => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
