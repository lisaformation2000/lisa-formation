export default function Confidentialite() {
  return (
    <main className="min-h-screen bg-[#070014] text-white px-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
        Politique de confidentialité
      </h1>
      <p className="text-gray-400 text-sm mb-6">Dernière mise à jour : juillet 2026</p>

      <div className="border-l-4 border-violet-400 bg-violet-500/10 rounded-r-xl px-5 py-4 mb-12 text-gray-300 text-sm italic">
        Nous respectons ta vie privée. Cette page t'explique clairement quelles données nous collectons, pourquoi, et comment tu peux exercer tes droits.
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
        <h2 className="text-xl font-bold text-violet-300 mb-4">2. Données collectées</h2>
        <h3 className="text-base font-semibold text-white mb-2">Lors de l'inscription</h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Adresse email, prénom — utilisés pour créer ton compte et t'envoyer tes accès.
        </p>
        <h3 className="text-base font-semibold text-white mb-2">Lors du paiement</h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Le paiement est traité par Stripe (carte bancaire ou Klarna). Nous ne stockons jamais tes données bancaires.
        </p>
        <h3 className="text-base font-semibold text-white mb-2">Lors de l'utilisation du site</h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Données de connexion (date, heure, sessions consultées) — utilisées pour assurer le bon fonctionnement de ton espace membre et te délivrer ton attestation à la session 30.
        </p>
        <h3 className="text-base font-semibold text-white mb-2">Emails automatiques</h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          Ton adresse email est utilisée pour l'envoi des confirmations et de l'attestation finale via Brevo, notre prestataire d'emailing transactionnel.
        </p>
        <p className="text-gray-300 text-sm leading-relaxed">
          Dans le cadre de ces envois, Brevo comptabilise les ouvertures et les clics sur les emails que nous t'adressons, afin de nous permettre de vérifier la bonne délivrabilité de nos communications (par exemple, confirmer qu'un email de bienvenue ou d'accès a bien été reçu et ouvert). Ces statistiques sont associées à ton adresse email.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-violet-300 mb-4">3. Finalité des traitements</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-300 border border-white/10 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-white/10 text-white">
                <th className="text-left px-4 py-3 font-medium">Donnée</th>
                <th className="text-left px-4 py-3 font-medium">Finalité</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Email + prénom", "Création du compte — envoi des accès — emails de suivi"],
                ["Données de connexion", "Suivi de progression — génération du certificat"],
                ["Données de paiement", "Traitement de la transaction (via Stripe, carte ou Klarna)"],
                ["Ouvertures / clics email", "Mesure de la délivrabilité des emails transactionnels (via Brevo)"],
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
        <h2 className="text-xl font-bold text-violet-300 mb-4">4. Durée de conservation</h2>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          Tes données sont conservées pendant toute la durée de ton accès à la formation et pendant les délais légaux applicables (10 ans pour les données comptables).
        </p>
        <p className="text-gray-300 text-sm leading-relaxed">
          À ta demande, nous pouvons supprimer ton compte. La suppression entraîne la perte de l'accès à la formation.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-violet-300 mb-4">5. Partage des données</h2>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Tes données ne sont jamais vendues ni cédées à des tiers à des fins commerciales. Elles sont transmises uniquement aux sous-traitants techniques suivants :
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm text-gray-300 border border-white/10 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-white/10 text-white">
                <th className="text-left px-4 py-3 font-medium">Sous-traitant</th>
                <th className="text-left px-4 py-3 font-medium">Rôle</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Supabase", "Hébergement de la base de données et authentification"],
                ["Vercel", "Hébergement du site web"],
                ["Stripe", "Traitement sécurisé des paiements (carte bancaire et Klarna)"],
                ["Klarna", "Solution de paiement fractionné tierce, indépendante de N.F."],
                ["Brevo", "Envoi des emails transactionnels (bienvenue, accusé de rétractation, attestation) et suivi des ouvertures/clics associés"],
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
          Note : les outils IA présentés dans la formation (Claude, ChatGPT, etc.) sont soumis aux politiques de leurs propres éditeurs. N.F. n'a aucun accès aux données que tu leur transmets.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-violet-300 mb-4">6. Cookies</h2>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          Le site utilise uniquement des cookies <strong className="text-white">strictement nécessaires</strong> au fonctionnement : cookie de session d'authentification (Supabase), cookie de transaction sécurisée (Stripe lors du paiement). Ces cookies sont exemptés de consentement au sens de l'article 82 de la loi Informatique et Libertés.
        </p>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          Aucun cookie publicitaire, de suivi ou d'analyse comportementale n'est utilisé sur ce site. Aucune donnée de navigation n'est transmise à des régies publicitaires.
        </p>
        <p className="text-gray-400 text-xs italic">
          Conformément aux recommandations de la CNIL, un bandeau de consentement n'est pas requis pour les cookies exclusivement techniques. Pour toute question : contact@formationlisa.fr.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-violet-300 mb-4">7. Tes droits</h2>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Conformément au RGPD, tu disposes des droits suivants :
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm text-gray-300 border border-white/10 rounded-xl overflow-hidden">
            <tbody>
              {[
                ["Droit d'accès", "Obtenir une copie de tes données"],
                ["Droit de rectification", "Corriger des données inexactes"],
                ["Droit à l'effacement", "Supprimer ton compte et tes données"],
                ["Droit à la portabilité", "Recevoir tes données dans un format lisible"],
                ["Droit d'opposition", "T'opposer à certains traitements, y compris au suivi des ouvertures/clics de nos emails"],
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
        <p className="text-gray-300 text-sm">Réclamation auprès de la CNIL : <span className="text-violet-300">cnil.fr</span></p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-violet-300 mb-4">8. Sécurité</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Authentification sécurisée via Supabase, connexions chiffrées HTTPS, accès restreints aux données.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-violet-300 mb-4">9. Modifications</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Cette politique peut être mise à jour. En cas de modification importante, tu seras informé(e) par email.
        </p>
      </section>

      <p className="text-center text-gray-600 text-xs mt-16">© N.F. — Lisa Formation IA — Tous droits réservés</p>
    </main>
  );
}