import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://gbofcnkddnndvhypjnbh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdib2ZjbmtkZG5uZHZoeXBqbmJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5ODEyOTIsImV4cCI6MjA0ODU1NzI5Mn0.Vxks3bUbD9SlkGyAzrIAWMKIegi-PEnQwme9MQjx8II')

async function uploadFile(file) {
  const { data, error } = await supabase.storage
    .from('your-bucket-name')
    .upload('public/' + file.name, file)

  if (error) {
    console.error('Upload error:', error)
    return
  }
  console.log('File uploaded:', data)
}
