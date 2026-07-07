import Link from "next/link";

export default function CGV() {
    return (
      <main className="min-h-screen bg-[#070014] text-white px-6 py-16 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Conditions GÃ©nÃ©rales de Vente
        </h1>
        <p className="text-gray-400 text-sm mb-12">DerniÃ¨re mise Ã  jour : juin 2026</p>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">1. Identification du vendeur</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-2 text-gray-300 text-sm">
            <p><span className="text-white font-medium">Nom :</span> N.F.</p>
            <p><span className="text-white font-medium">Statut :</span> Entrepreneur individuel (micro-entreprise)</p>
            <p><span className="text-white font-medium">Nom commercial :</span> Lisa Formation IA</p>
            <p><span className="text-white font-medium">SIREN :</span> 105 864 318</p>
            <p><span className="text-white font-medium">SIRET :</span> 10586431800016</p>
            <p><span className="text-white font-medium">Code APE :</span> 85.59A â€” Autres enseignements</p>
            <p><span className="text-white font-medium">Adresse :</span> France</p>
            <p><span className="text-white font-medium">Email :</span> contact@formationlisa.fr</p>
            <p><span className="text-white font-medium">Site :</span> formationlisa.fr</p>
          </div>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">2. Description du service</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            LISA est une formation en ligne destinÃ©e aux particuliers et professionnels souhaitant apprendre Ã  utiliser l'intelligence artificielle au quotidien, sans prÃ©requis technique.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-300 border border-white/10 rounded-xl overflow-hidden">
              <tbody>
                {[
                  ["Nom du produit", "LISA â€” La formation pour dÃ©buter avec l'IA"],
                  ["Contenu", "Session dÃ©couverte gratuite + 30 sessions en ligne"],
                  ["DurÃ©e estimÃ©e", "Environ 45 heures â€” format libre, Ã  ton rythme"],
                  ["AccÃ¨s", "Ã€ vie â€” sans abonnement â€” depuis tout appareil connectÃ©"],
                  ["Certificat", "Attestation de formation dÃ©livrÃ©e Ã  la session 30"],
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
            Le prix de la formation est fixÃ© Ã  <span className="text-white font-bold">147 â‚¬ TTC</span>, paiement unique.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            En tant que micro-entreprise, TVA non applicable â€” article 293 B du CGI.
          </p>
          <div className="border-l-4 border-violet-400 bg-violet-500/10 rounded-r-xl px-5 py-4 text-gray-300 text-sm italic">
            Prix early adopters et parrainage : 127 â‚¬ TTC â€” offre limitÃ©e Ã  la pÃ©riode de lancement et aux parrainages.
          </div>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">4. Programme de parrainage</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            LISA propose un programme de parrainage selon les conditions suivantes :
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-3 text-gray-300 text-sm">
            <p><span className="text-white font-medium">Pour le filleul (la personne parrainÃ©e) :</span> accÃ¨s Ã  la formation au tarif prÃ©fÃ©rentiel de <span className="text-white font-bold">127 â‚¬ TTC</span> au lieu de 147 â‚¬.</p>
            <p><span className="text-white font-medium">Pour le parrain :</span> rÃ©ception du livre blanc <span className="text-white font-bold">Â« L'IA au Quotidien Â»</span> offert, envoyÃ© par email aprÃ¨s confirmation de l'inscription du filleul.</p>
            <p><span className="text-white font-medium">Condition :</span> le parrainage est valide uniquement si le filleul finalise son inscription et son paiement via le lien de parrainage fourni.</p>
          </div>
          <p className="text-gray-400 text-xs mt-3 italic">
            Le livre blanc Â« L'IA au Quotidien Â» est un contenu numÃ©rique exclusif rÃ©servÃ© aux membres et aux parrains. Il ne peut pas Ãªtre revendu ni redistribuÃ©.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">5. ModalitÃ©s de paiement</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Le paiement est effectuÃ© en ligne, au moment de la commande, par carte bancaire via la plateforme sÃ©curisÃ©e Stripe. La commande n'est validÃ©e qu'aprÃ¨s confirmation du paiement. Un email de confirmation est envoyÃ© automatiquement.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">6. AccÃ¨s Ã  la formation</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            L'accÃ¨s Ã  l'espace membre est ouvert immÃ©diatement aprÃ¨s confirmation du paiement. Tu reÃ§ois tes identifiants par email dans les minutes suivant l'achat.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">7. Droit de rÃ©tractation</h2>
          <div className="border-l-4 border-pink-400 bg-pink-500/10 rounded-r-xl px-5 py-4 text-gray-300 text-sm mb-4">
            Tu disposes d'un dÃ©lai de <strong className="text-white">14 jours calendaires</strong> Ã  compter de la date d'achat pour exercer ton droit de rÃ©tractation, sans avoir Ã  justifier ta dÃ©cision ni Ã  supporter de pÃ©nalitÃ©s (article L221-18 du Code de la consommation).
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            <span className="text-white font-medium">Exception :</span> conformÃ©ment Ã  l'article L221-28 du Code de la consommation, le droit de rÃ©tractation ne s'applique pas si tu as expressÃ©ment acceptÃ©, lors de l'achat, de commencer la formation avant l'expiration du dÃ©lai de 14 jours et reconnu perdre ainsi ton droit de rÃ©tractation.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            Lors du paiement, une case Ã  cocher dÃ©diÃ©e te permet de faire ce choix. Si tu la coches, tu acceptes l'accÃ¨s immÃ©diat et renonces expressÃ©ment Ã  ton droit de rÃ©tractation.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Pour exercer ton droit de rÃ©tractation (si applicable), tu peux utiliser{" "}
            <a href="/retractation" className="text-violet-300 underline hover:text-violet-200">
              notre formulaire de rÃ©tractation en ligne
            </a>
            {" "}â€” accessible librement, sans crÃ©ation de compte â€” ou envoyer un email Ã  contact@formationlisa.fr avec le formulaire suivant :
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-gray-300 text-sm space-y-3">
            <p className="font-bold text-white">FORMULAIRE DE RÃ‰TRACTATION</p>
            <p>Ã€ envoyer Ã  : <span className="text-violet-300">contact@formationlisa.fr</span></p>
            <p>Je soussignÃ©(e) [PrÃ©nom Nom] dÃ©clare exercer mon droit de rÃ©tractation concernant la formation LISA achetÃ©e le [date] pour un montant de [montant] euros.</p>
            <p>Signature : ___________________________ &nbsp;&nbsp;&nbsp; Date : _______________</p>
          </div>
          <p className="text-gray-400 text-xs mt-3">
            Un accusÃ© de rÃ©ception sur support durable te sera adressÃ© dans les meilleurs dÃ©lais. Le remboursement Ã©ventuel interviendra dans un dÃ©lai de 14 jours Ã  compter de la rÃ©ception de la demande, par le mÃªme moyen de paiement que celui utilisÃ© lors de l'achat.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">8. AccÃ¨s des mineurs</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            La formation LISA est destinÃ©e aux personnes majeures (18 ans et plus). L'accÃ¨s par un mineur est possible uniquement avec l'autorisation Ã©crite d'un parent ou tuteur lÃ©gal. En finalisant l'achat, l'acheteur confirme Ãªtre majeur ou disposer de cette autorisation.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">9. Outils d'intelligence artificielle tiers</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            La formation LISA prÃ©sente des outils d'intelligence artificielle tiers (Claude, ChatGPT, Gemini, Perplexity, etc.). Ces outils sont fournis par des sociÃ©tÃ©s indÃ©pendantes et susceptibles d'Ã©voluer sans prÃ©avis.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            N.F. ne peut Ãªtre tenue responsable de leur disponibilitÃ© ou de leurs rÃ©sultats. <strong className="text-white">L'IA ne remplace pas le jugement humain ni l'avis d'un professionnel qualifiÃ©.</strong>
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">10. Obligations de l'acheteur</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            La formation est destinÃ©e Ã  un usage strictement personnel. Il est interdit de partager ses identifiants, de reproduire, revendre ou diffuser le contenu Ã  des tiers sans autorisation Ã©crite.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">11. Obligations du vendeur</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            N.F. s'engage Ã  maintenir l'accÃ¨s Ã  la formation pendant toute la durÃ©e de vie de la plateforme. En cas d'arrÃªt dÃ©finitif, un prÃ©avis de 3 mois sera communiquÃ© par email avec possibilitÃ© de tÃ©lÃ©charger l'ensemble du contenu.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">12. ResponsabilitÃ©</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            La formation LISA est une formation d'initiation. Elle ne constitue pas un conseil professionnel, juridique, mÃ©dical ou financier. Les rÃ©sultats obtenus dÃ©pendent de l'investissement personnel de chaque participant.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">13. PropriÃ©tÃ© intellectuelle</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            L'intÃ©gralitÃ© du contenu de la formation est la propriÃ©tÃ© exclusive de N.F.. Toute reproduction ou diffusion sans autorisation Ã©crite est interdite.
          </p>
          <p className="text-gray-400 text-xs">Â© N.F. â€” Lisa Formation IA â€” Tous droits rÃ©servÃ©s</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">14. Intelligence artificielle et crÃ©ation de contenu</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            ConformÃ©ment au RÃ¨glement europÃ©en sur l'intelligence artificielle (IA Act, UE 2024/1689), il est prÃ©cisÃ© que certains contenus pÃ©dagogiques de la formation LISA ont Ã©tÃ© partiellement crÃ©Ã©s ou assistÃ©s par des outils d'intelligence artificielle. L'ensemble du contenu a Ã©tÃ© relu, validÃ© et supervisÃ© par N.F. avant publication.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">15. DonnÃ©es personnelles</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Le traitement de tes donnÃ©es personnelles est dÃ©crit dans notre{" "}
            <a href="/confidentialite" className="text-violet-300 underline hover:text-violet-200">
              Politique de ConfidentialitÃ©
            </a>.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">16. Attestation de formation</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            Une attestation de formation est dÃ©livrÃ©e automatiquement Ã  l'issue de la session 30.
          </p>
          <p className="text-gray-400 text-xs italic">
            Cette attestation n'est pas certifiÃ©e Qualiopi. Elle est valorisable sur LinkedIn et CV Ã  titre informatif.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-xl font-bold text-violet-300 mb-4">17. MÃ©diation et litiges</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            En cas de litige, une solution amiable sera privilÃ©giÃ©e. Contacte d'abord contact@formationlisa.fr. Les prÃ©sentes CGV sont soumises au droit franÃ§ais.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            En cas d'Ã©chec de la rÃ©clamation amiable, tu peux recourir gratuitement au service de mÃ©diation :
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-gray-300 space-y-1">
            <p><span className="text-white font-medium">MÃ©diateur :</span> CM2C â€” Centre de la MÃ©diation de la Consommation de Conciliateurs de Justice</p>
            <p><span className="text-white font-medium">Adresse :</span> 4 Rue Saint-Jean, 75017 Paris</p>
            <p><span className="text-white font-medium">Site :</span>{" "}
              <a href="https://www.cm2c.net" target="_blank" rel="noopener noreferrer" className="text-violet-300 underline hover:text-violet-200">
                www.cm2c.net
              </a>
            </p>
          </div>
          <p className="text-gray-400 text-xs mt-3">
            Liste officielle des mÃ©diateurs approuvÃ©s par la Commission d'Ã©valuation et de contrÃ´le de la mÃ©diation de la consommation (CECMC) disponible sur economie.gouv.fr.
          </p>
        </section>
  
        <p className="text-center text-gray-600 text-xs mt-16">Â© N.F. â€” Lisa Formation IA â€” Tous droits rÃ©servÃ©s</p>
      </main>
    );
  }

