export function parseUserAgent(userAgent: string) {
  const ua = userAgent.toLowerCase()
  
  const browser = ua.includes('chrome') ? 'Chrome' : ua.includes('firefox') ? 'Firefox' : 
                  ua.includes('safari') ? 'Safari' : ua.includes('edge') ? 'Edge' : 'Unknown'
  
  const os = ua.includes('windows') ? 'Windows' : ua.includes('mac') ? 'macOS' : 
             ua.includes('linux') ? 'Linux' : ua.includes('android') ? 'Android' : 
             ua.includes('ios') ? 'iOS' : 'Unknown'
  
  const device = ua.includes('mobile') ? 'Mobile' : ua.includes('tablet') ? 'Tablet' : 'Desktop'
  
  return { browser, os, device }
}

export async function getLocationFromIP(ip: string) {
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}`)
    const data = await res.json()
    return {
      country: data.country,
      city: data.city,
      region: data.regionName,
      timezone: data.timezone
    }
  } catch {
    return { country: 'Unknown', city: 'Unknown', region: 'Unknown', timezone: 'Unknown' }
  }
}
