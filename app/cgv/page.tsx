export default function CGV() {
    return (
      <main className="min-h-screen bg-[#070014] text-white px-6 py-16 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Conditions Générales de Vente
        </h1>
        <p className="text-gray-400 text-sm mb-12">Dernière mise à jour : juin 2026</p>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">1. Identification du vendeur</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-2 text-gray-300 text-sm">
            <p><span className="text-white font-medium">Nom :</span> Nadia Farfar</p>
            <p><span className="text-white font-medium">Statut :</span> Entrepreneur individuel (micro-entreprise)</p>
            <p><span className="text-white font-medium">Nom commercial :</span> Lisa Formation IA</p>
            <p><span className="text-white font-medium">SIREN :</span> 105 864 318</p>
            <p><span className="text-white font-medium">SIRET :</span> 10586431800016</p>
            <p><span className="text-white font-medium">Code APE :</span> 85.59A — Autres enseignements</p>
            <p><span className="text-white font-medium">Adresse :</span> 935 Route de la Vy de l'Eau, 74140 Saint-Cergues, France</p>
            <p><span className="text-white font-medium">Email :</span> lisaformationia@gmail.com</p>
            <p><span className="text-white font-medium">Site :</span> formationlisa.fr</p>
          </div>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">2. Description du service</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            LISA est une formation en ligne destinée aux particuliers et professionnels souhaitant apprendre à utiliser l'intelligence artificielle au quotidien, sans prérequis technique.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-300 border border-white/10 rounded-xl overflow-hidden">
              <tbody>
                {[
                  ["Nom du produit", "LISA — La formation pour débuter avec l'IA"],
                  ["Contenu", "Session découverte gratuite + 30 sessions en ligne"],
                  ["Durée estimée", "Environ 45 heures — format libre, à ton rythme"],
                  ["Accès", "À vie — sans abonnement — depuis tout appareil connecté"],
                  ["Certificat", "Attestation de formation délivrée à la session 30"],
                ].map(([label, value], i) => (
                  <tr key={label} className={`border-t border-white/10 ${i % 2 === 1 ? "bg-white/5" : ""}`}>
                    <td className="px-4 py-3 font-medium text-white w-1/3">{label}</td>
                    <td className="px-4 py-3">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">3. Prix</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            Le prix de la formation est fixé à <span className="text-white font-bold">147 € TTC</span>, paiement unique.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            En tant que micro-entreprise, TVA non applicable — article 293 B du CGI.
          </p>
          <div className="border-l-4 border-violet-400 bg-violet-500/10 rounded-r-xl px-5 py-4 text-gray-300 text-sm italic">
            Prix early adopters et parrainage : 127 € TTC — offre limitée à la période de lancement et aux parrainages.
          </div>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">4. Programme de parrainage</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            LISA propose un programme de parrainage selon les conditions suivantes :
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-3 text-gray-300 text-sm">
            <p><span className="text-white font-medium">Pour le filleul (la personne parrainée) :</span> accès à la formation au tarif préférentiel de <span className="text-white font-bold">127 € TTC</span> au lieu de 147 €.</p>
            <p><span className="text-white font-medium">Pour le parrain :</span> réception du livre blanc <span className="text-white font-bold">« L'IA au Quotidien »</span> offert, envoyé par email après confirmation de l'inscription du filleul.</p>
            <p><span className="text-white font-medium">Condition :</span> le parrainage est valide uniquement si le filleul finalise son inscription et son paiement via le lien de parrainage fourni.</p>
          </div>
          <p className="text-gray-400 text-xs mt-3 italic">
            Le livre blanc « L'IA au Quotidien » est un contenu numérique exclusif réservé aux membres et aux parrains. Il ne peut pas être revendu ni redistribué.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">5. Modalités de paiement</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Le paiement est effectué en ligne, au moment de la commande, par carte bancaire via la plateforme sécurisée Stripe. La commande n'est validée qu'après confirmation du paiement. Un email de confirmation est envoyé automatiquement.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">6. Accès à la formation</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            L'accès à l'espace membre est ouvert immédiatement après confirmation du paiement. Tu reçois tes identifiants par email dans les minutes suivant l'achat.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">7. Droit de rétractation</h2>
          <div className="border-l-4 border-pink-400 bg-pink-500/10 rounded-r-xl px-5 py-4 text-gray-300 text-sm mb-4">
            Tu disposes d'un délai de <strong className="text-white">14 jours calendaires</strong> à compter de la date d'achat pour exercer ton droit de rétractation, sans avoir à justifier ta décision ni à supporter de pénalités (article L221-18 du Code de la consommation).
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            <span className="text-white font-medium">Exception :</span> conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne s'applique pas si tu as expressément accepté, lors de l'achat, de commencer la formation avant l'expiration du délai de 14 jours et reconnu perdre ainsi ton droit de rétractation.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            Lors du paiement, une case à cocher te permet de faire ce choix. Si tu la coches, tu acceptes l'accès immédiat et renonces à ton droit de rétractation.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Pour exercer ton droit de rétractation, envoie un email à lisaformationia@gmail.com avec le formulaire suivant :
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-gray-300 text-sm space-y-3">
            <p className="font-bold text-white">FORMULAIRE DE RÉTRACTATION</p>
            <p>À envoyer à : <span className="text-violet-300">lisaformationia@gmail.com</span></p>
            <p>Je soussigné(e) [Prénom Nom] déclare exercer mon droit de rétractation concernant la formation LISA achetée le [date] pour un montant de [montant] euros.</p>
            <p>Signature : ___________________________ &nbsp;&nbsp;&nbsp; Date : _______________</p>
          </div>
          <p className="text-gray-400 text-xs mt-3">
            Le remboursement sera effectué dans un délai de 14 jours après réception de la demande, par le même moyen de paiement.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">8. Accès des mineurs</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            La formation LISA est destinée aux personnes majeures (18 ans et plus). L'accès par un mineur est possible uniquement avec l'autorisation écrite d'un parent ou tuteur légal. En finalisant l'achat, l'acheteur confirme être majeur ou disposer de cette autorisation.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">9. Outils d'intelligence artificielle tiers</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            La formation LISA présente des outils d'intelligence artificielle tiers (Claude, ChatGPT, Gemini, Perplexity, etc.). Ces outils sont fournis par des sociétés indépendantes et susceptibles d'évoluer sans préavis.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Nadia Farfar ne peut être tenue responsable de leur disponibilité ou de leurs résultats. <strong className="text-white">L'IA ne remplace pas le jugement humain ni l'avis d'un professionnel qualifié.</strong>
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">10. Obligations de l'acheteur</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            La formation est destinée à un usage strictement personnel. Il est interdit de partager ses identifiants, de reproduire, revendre ou diffuser le contenu à des tiers sans autorisation écrite.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">11. Obligations du vendeur</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Nadia Farfar s'engage à maintenir l'accès à la formation pendant toute la durée de vie de la plateforme. En cas d'arrêt définitif, un préavis de 3 mois sera communiqué par email avec possibilité de télécharger l'ensemble du contenu.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">12. Responsabilité</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            La formation LISA est une formation d'initiation. Elle ne constitue pas un conseil professionnel, juridique, médical ou financier. Les résultats obtenus dépendent de l'investissement personnel de chaque participant.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">13. Propriété intellectuelle</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            L'intégralité du contenu de la formation est la propriété exclusive de Nadia Farfar. Toute reproduction ou diffusion sans autorisation écrite est interdite.
          </p>
          <p className="text-gray-400 text-xs">© Nadia Farfar — Lisa Formation IA — Tous droits réservés</p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">14. Données personnelles</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Le traitement de tes données personnelles est décrit dans notre{" "}
            <a href="/confidentialite" className="text-violet-300 underline hover:text-violet-200">
              Politique de Confidentialité
            </a>.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">15. Attestation de formation</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            Une attestation de formation est délivrée automatiquement à l'issue de la session 30.
          </p>
          <p className="text-gray-400 text-xs italic">
            Cette attestation n'est pas certifiée Qualiopi. Elle est valorisable sur LinkedIn et CV à titre informatif.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">16. Médiation et litiges</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            En cas de litige, une solution amiable sera privilégiée. Les présentes CGV sont soumises au droit français.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            Médiation gratuite : <span className="text-violet-300">DEVIGNY MÉDIATION — devignymediation.fr</span>
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            En cas de litige non résolu à l'amiable, les règles de compétence prévues par le droit français s'appliqueront.
          </p>
        </section>
  
        <p className="text-center text-gray-600 text-xs mt-16">© Nadia Farfar — Lisa Formation IA — Tous droits réservés</p>
      </main>
    );
  }