export default function Confidentialite() {
  return (
    <main className="min-h-screen bg-[#070014] text-white px-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
        Politique de confidentialitÃ©
      </h1>
      <p className="text-gray-400 text-sm mb-6">DerniÃ¨re mise Ã  jour : juin 2026</p>

      <div className="border-l-4 border-violet-400 bg-violet-500/10 rounded-r-xl px-5 py-4 mb-12 text-gray-300 text-sm italic">
        Nous respectons ta vie privÃ©e. Cette page t'explique clairement quelles donnÃ©es nous collectons, pourquoi, et comment tu peux exercer tes droits.
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-violet-300 mb-4">1. Responsable du traitement</h2>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-2 text-gray-300 text-sm">
          <p><span className="text-white font-medium">Nom :</span> N.F.</p>
          <p><span className="text-white font-medium">Nom commercial :</span> Lisa Formation IA</p>
          <p><span className="text-white font-medium">SIRET :</span> 10586431800016</p>
          <p><span className="text-white font-medium">Adresse :</span> France</p>
          <p><span className="text-white font-medium">Email :</span> contact@formationlisa.fr</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-violet-300 mb-4">2. DonnÃ©es collectÃ©es</h2>
        <h3 className="text-base font-semibold text-white mb-2">Lors de l'inscription</h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Adresse email, prÃ©nom â€” utilisÃ©s pour crÃ©er ton compte et t'envoyer tes accÃ¨s.
        </p>
        <h3 className="text-base font-semibold text-white mb-2">Lors du paiement</h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Le paiement est traitÃ© par Stripe. Nous ne stockons jamais tes donnÃ©es bancaires.
        </p>
        <h3 className="text-base font-semibold text-white mb-2">Lors de l'utilisation du site</h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          DonnÃ©es de connexion (date, heure, sessions consultÃ©es) â€” utilisÃ©es pour assurer le bon fonctionnement de ton espace membre et te dÃ©livrer ton attestation Ã  la session 30.
        </p>
        <h3 className="text-base font-semibold text-white mb-2">Emails automatiques</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          Ton adresse email est utilisÃ©e pour l'envoi des confirmations et de l'attestation finale via Resend.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-violet-300 mb-4">3. FinalitÃ© des traitements</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-300 border border-white/10 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-white/10 text-white">
                <th className="text-left px-4 py-3 font-medium">DonnÃ©e</th>
                <th className="text-left px-4 py-3 font-medium">FinalitÃ©</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Email + prÃ©nom", "CrÃ©ation du compte â€” envoi des accÃ¨s â€” emails de suivi"],
                ["DonnÃ©es de connexion", "Suivi de progression â€” gÃ©nÃ©ration du certificat"],
                ["DonnÃ©es de paiement", "Traitement de la transaction (via Stripe uniquement)"],
              ].map(([donnee, finalite], i) => (
                <tr key={donnee} className={`border-t border-white/10 ${i % 2 === 1 ? "bg-white/5" : ""}`}>
                  <td className="px-4 py-3 text-white">{donnee}</td>
                  <td className="px-4 py-3">{finalite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-violet-300 mb-4">4. DurÃ©e de conservation</h2>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          Tes donnÃ©es sont conservÃ©es pendant toute la durÃ©e de ton accÃ¨s Ã  la formation et pendant les dÃ©lais lÃ©gaux applicables (10 ans pour les donnÃ©es comptables).
        </p>
        <p className="text-gray-300 text-sm leading-relaxed">
          Ã€ ta demande, nous pouvons supprimer ton compte. La suppression entraÃ®ne la perte de l'accÃ¨s Ã  la formation.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-violet-300 mb-4">5. Partage des donnÃ©es</h2>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Tes donnÃ©es ne sont jamais vendues ni cÃ©dÃ©es Ã  des tiers Ã  des fins commerciales. Elles sont transmises uniquement aux sous-traitants techniques suivants :
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm text-gray-300 border border-white/10 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-white/10 text-white">
                <th className="text-left px-4 py-3 font-medium">Sous-traitant</th>
                <th className="text-left px-4 py-3 font-medium">RÃ´le</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Supabase", "HÃ©bergement de la base de donnÃ©es et authentification"],
                ["Vercel", "HÃ©bergement du site web"],
                ["Stripe", "Traitement sÃ©curisÃ© des paiements"],
                ["Resend", "Envoi des emails transactionnels (bienvenue, accusÃ© de rÃ©tractation)"],
              ].map(([name, role], i) => (
                <tr key={name} className={`border-t border-white/10 ${i % 2 === 1 ? "bg-white/5" : ""}`}>
                  <td className="px-4 py-3 font-medium text-white">{name}</td>
                  <td className="px-4 py-3">{role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-400 text-xs italic">
          Note : les outils IA prÃ©sentÃ©s dans la formation (Claude, ChatGPT, etc.) sont soumis aux politiques de leurs propres Ã©diteurs. N.F. n'a aucun accÃ¨s aux donnÃ©es que tu leur transmets.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-violet-300 mb-4">6. Cookies</h2>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          Le site utilise uniquement des cookies <strong className="text-white">strictement nÃ©cessaires</strong> au fonctionnement : cookie de session d'authentification (Supabase), cookie de transaction sÃ©curisÃ©e (Stripe lors du paiement). Ces cookies sont exemptÃ©s de consentement au sens de l'article 82 de la loi Informatique et LibertÃ©s.
        </p>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          Aucun cookie publicitaire, de suivi ou d'analyse comportementale n'est utilisÃ© sur ce site. Aucune donnÃ©e de navigation n'est transmise Ã  des rÃ©gies publicitaires.
        </p>
        <p className="text-gray-400 text-xs italic">
          ConformÃ©ment aux recommandations de la CNIL, un bandeau de consentement n'est pas requis pour les cookies exclusivement techniques. Pour toute question : contact@formationlisa.fr.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-violet-300 mb-4">7. Tes droits</h2>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          ConformÃ©ment au RGPD, tu disposes des droits suivants :
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm text-gray-300 border border-white/10 rounded-xl overflow-hidden">
            <tbody>
              {[
                ["Droit d'accÃ¨s", "Obtenir une copie de tes donnÃ©es"],
                ["Droit de rectification", "Corriger des donnÃ©es inexactes"],
                ["Droit Ã  l'effacement", "Supprimer ton compte et tes donnÃ©es"],
                ["Droit Ã  la portabilitÃ©", "Recevoir tes donnÃ©es dans un format lisible"],
                ["Droit d'opposition", "T'opposer Ã  certains traitements"],
              ].map(([droit, desc], i) => (
                <tr key={droit} className={`border-t border-white/10 ${i % 2 === 1 ? "bg-white/5" : ""}`}>
                  <td className="px-4 py-3 font-medium text-white w-1/3">{droit}</td>
                  <td className="px-4 py-3">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-300 text-sm mb-2">Pour exercer ces droits : <span className="text-violet-300">contact@formationlisa.fr</span></p>
        <p className="text-gray-300 text-sm">RÃ©clamation auprÃ¨s de la CNIL : <span className="text-violet-300">cnil.fr</span></p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-violet-300 mb-4">8. SÃ©curitÃ©</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Authentification sÃ©curisÃ©e via Supabase, connexions chiffrÃ©es HTTPS, accÃ¨s restreints aux donnÃ©es.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-violet-300 mb-4">9. Modifications</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Cette politique peut Ãªtre mise Ã  jour. En cas de modification importante, tu seras informÃ©(e) par email.
        </p>
      </section>

      <p className="text-center text-gray-600 text-xs mt-16">Â© N.F. â€” Lisa Formation IA â€” Tous droits rÃ©servÃ©s</p>
    </main>
  );
}

