'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'

const PASSWORD = 'Grupo@Ceviche'
const SESSION_KEY = 'gc_report_auth'

export default function Page() {
  const [authenticated, setAuthenticated] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY)
    if (stored === '1') setAuthenticated(true)
    setLoading(false)
  }, [])

  function handleLogin(e) {
    e.preventDefault()
    if (input === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setAuthenticated(true)
      setError(false)
    } else {
      setError(true)
      setInput('')
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthenticated(false)
    setInput('')
  }

  if (loading) return null

  if (!authenticated) {
    return (
      <div className={styles.loginWrap}>
        <div className={styles.loginCard}>
          <img
            src="/logo.png"
            alt="Grupo Ceviche"
            className={styles.logo}
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <h1 className={styles.title}>Reportes</h1>
          <p className={styles.subtitle}>Grupo Ceviche</p>
          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.fieldWrap}>
              <label htmlFor="pwd" className={styles.label}>Contraseña</label>
              <input
                id="pwd"
                type="password"
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(false) }}
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                placeholder="Introduce la contraseña"
                autoFocus
                autoComplete="current-password"
              />
              {error && (
                <p className={styles.errorMsg}>Contraseña incorrecta. Inténtalo de nuevo.</p>
              )}
            </div>
            <button type="submit" className={styles.btn}>Acceder</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.reportWrap}>
      <header className={styles.header}>
        <span className={styles.headerTitle}>Reporte — Grupo Ceviche</span>
        <button onClick={handleLogout} className={styles.logoutBtn}>Cerrar sesión</button>
      </header>
      <div className={styles.iframeWrap}>
        <iframe
          title="Reporte_300326"
          src="https://app.powerbi.com/view?r=eyJrIjoiMmNiZDMyNmUtMzJiNS00NWQ2LWEyNGItODg3OTgxMGZhZWIyIiwidCI6IjVhYWRkZDQ3LWI0OTUtNGMxZi1iMWVjLTI0MGZlOWE5Y2FjMyJ9"
          frameBorder="0"
          allowFullScreen
          className={styles.iframe}
        />
      </div>
    </div>
  )
}
