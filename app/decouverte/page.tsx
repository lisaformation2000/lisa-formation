const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault()
  setError('')

  if (!email.trim() || !motDePasse) {
    setError('Merci de remplir tous les champs.')
    return
  }
  if (motDePasse.length < 8) {
    setError('Le mot de passe doit contenir au moins 8 caractères.')
    return
  }

  setLoading(true)

  // Créer le compte directement
  const { error: signUpError } = await supabase.auth.signUp({
    email: email.trim(),
    password: motDePasse,
  })

  if (signUpError) {
    // Compte existant → tenter connexion
    if (signUpError.message.includes('already registered') || signUpError.message.includes('User already registered')) {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: motDePasse,
      })
      if (loginError) {
        setError('Un compte existe déjà avec cet email. Vérifie ton mot de passe.')
        setLoading(false)
        return
      }
      router.push('/session/0')
      return
    }
    setError('Une erreur est survenue. Réessaie.')
    setLoading(false)
    return
  }

  // Connexion immédiate après création
  await supabase.auth.signInWithPassword({
    email: email.trim(),
    password: motDePasse,
  })

  router.push('/session/0')
}