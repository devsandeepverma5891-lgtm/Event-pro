const API_BASE = (import.meta.env.VITE_API_BASE ?? 'http://localhost:8080').trim()

export async function apiPost(path, body, token, isFormData = false) {
  const headers = {}
  
  if (!isFormData) {
    headers['Content-Type'] = 'application/json'
  }
  
  if (token) {
    headers['Authorization'] = token
  }

  
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers,
    body: isFormData ? body : JSON.stringify(body)
  })

  console.log(res);
  
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data?.message || 'Request failed')
  }
  return data
}

export async function apiGet(path, token) {
  const headers = {}
  
  if (token) {
    headers['Authorization'] = token
  }

  const res = await fetch(`${API_BASE}${path}`, {
    headers
  })
  
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data?.message || 'Request failed')
  }
  return data
}

export async function apiPut(path, body, token, isFormData = false) {
  const headers = {}
  
  if (!isFormData) {
    headers['Content-Type'] = 'application/json'
  }
  
  if (token) {
    headers['Authorization'] = token
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers,
    body: isFormData ? body : JSON.stringify(body)
  })
  
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data?.message || 'Request failed')
  }
  return data
}

export async function apiDelete(path, token) {
  const headers = {}
  
  if (token) {
    headers['Authorization'] = token
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method: 'DELETE',
    headers
  })
  
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data?.message || 'Request failed')
  }
  return data
}
