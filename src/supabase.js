// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// Replace with your actual Supabase project URL and anon key
const supabaseUrl = 'https://gbofcnkddnndvhypjnbh.supabase.co'  // Your Supabase project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdib2ZjbmtkZG5uZHZoeXBqbmJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5ODEyOTIsImV4cCI6MjA0ODU1NzI5Mn0.Vxks3bUbD9SlkGyAzrIAWMKIegi-PEnQwme9MQjx8II'  // Your Supabase anon key

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
