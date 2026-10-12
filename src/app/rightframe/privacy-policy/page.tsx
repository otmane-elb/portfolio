import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RightFrame — Privacy Policy',
  description:
    'Privacy Policy for RightFrame mobile application (iOS & Android). Learn how your data is handled with 100% on-device image processing and privacy-first design.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://otmaneportfolio.vercel.app/rightframe/privacy-policy',
  },
};

export default function RightFramePrivacyPolicy() {
  return (
    <article className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-200">
      {/* Header */}
      <header className="border-b border-violet-500/20 pb-8 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-violet-500/30 bg-violet-500/10 text-violet-300">
          Mobile Application Legal Document
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          RightFrame — Privacy Policy
        </h1>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
          <div><strong className="text-slate-300">Effective Date:</strong> October 12, 2026</div>
          <div><strong className="text-slate-300">Last Updated:</strong> October 12, 2026</div>
          <div><strong className="text-slate-300">Application:</strong> RightFrame (iOS & Android)</div>
          <div><strong className="text-slate-300">Bundle ID:</strong> <code className="text-violet-300 font-mono text-xs bg-violet-950/50 px-1.5 py-0.5 rounded border border-violet-800/40">com.rightframe.app</code></div>
        </div>
      </header>

      {/* Developer & Publisher Identity Note */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800 mb-10 text-sm space-y-2">
        <p className="font-semibold text-white uppercase tracking-wider text-xs text-violet-400">Developer & Publisher Identity</p>
        <div className="space-y-1.5 text-slate-300">
          <div><strong className="text-slate-200">Developer:</strong> Otmane El Baghazaoui (Independent Individual Developer)</div>
          <div><strong className="text-slate-200">Privacy Contact Email:</strong> <a href="mailto:otmane.elbaghazaoui@gmail.com" className="text-violet-400 hover:text-violet-300 underline underline-offset-4">otmane.elbaghazaoui@gmail.com</a></div>
          <div><strong className="text-slate-200">Country of Operation / Jurisdiction:</strong> Morocco</div>
          <div><strong className="text-slate-200">Target Public Policy URL:</strong> <a href="https://otmaneportfolio.vercel.app/rightframe/privacy-policy" className="text-violet-400 hover:text-violet-300 underline underline-offset-4 font-mono text-xs">https://otmaneportfolio.vercel.app/rightframe/privacy-policy</a></div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-12 text-slate-300 leading-relaxed text-base sm:text-lg">
        {/* Section 1 */}
        <section id="section-1" className="space-y-4">
          <h2 className="text-2xl font-bold text-white border-l-4 border-violet-500 pl-4">
            1. Introduction & Core Privacy Philosophy
          </h2>
          <p>
            RightFrame (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the App&rdquo;) is developed and published by <strong className="text-white">Otmane El Baghazaoui</strong>, an individual software developer operating in Morocco (not a corporate entity or registered company). We believe privacy is a fundamental human right. RightFrame was engineered from the ground up as a{' '}
            <strong className="text-white">privacy-first, on-device photo studio</strong> for passport photos, national identity documents, visa photos, image compression, format conversion, and signature preparation.
          </p>
          <div className="p-4 sm:p-5 rounded-xl bg-violet-950/30 border border-violet-500/30 text-slate-200">
            <p className="font-medium text-white mb-2">🔒 On-Device Guarantee</p>
            <p className="text-sm sm:text-base text-slate-300">
              Unlike cloud-based photo editors, <strong className="text-violet-300">RightFrame processes 100% of your images locally on your device</strong>. We do not operate an application backend, user database, or image upload server. Your photos, biometric facial features, and signatures never leave your device through RightFrame.
            </p>
          </div>
          <p>This Privacy Policy explains:</p>
          <ol className="list-decimal list-inside space-y-2 pl-2 text-slate-300">
            <li>What data is processed on your device.</li>
            <li>What permissions RightFrame requires and why.</li>
            <li>How advertising data is handled through the <strong className="text-white">Google Mobile Ads SDK</strong>.</li>
            <li>How user consent and regional privacy regulations (GDPR, UK GDPR, Swiss FADP, CCPA/CPRA, US State Laws) are respected.</li>
            <li>Your privacy rights and choices.</li>
          </ol>
        </section>

        {/* Section 2 */}
        <section id="section-2" className="space-y-4">
          <h2 className="text-2xl font-bold text-white border-l-4 border-violet-500 pl-4">
            2. On-Device Image Processing & Device Data
          </h2>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-slate-100">2.1 Photo & Document Processing</h3>
            <ul className="list-disc list-outside ml-5 space-y-2 text-slate-300">
              <li>
                <strong className="text-white">100% Local Execution:</strong> When you take a photo or select an image from your library to create a passport photo, resize, compress, crop, or prepare a signature, all computations are executed exclusively by your device&apos;s local CPU and GPU.
              </li>
              <li>
                <strong className="text-white">No Image Uploads:</strong> We do not transmit, upload, inspect, or store your photos or documents on any external servers or cloud services.
              </li>
              <li>
                <strong className="text-white">Biometric & Face Frames:</strong> Any alignment guidelines, face framing grids, or passport biometric crop boxes are purely visual client-side overlays. RightFrame does not perform remote facial recognition or create biometric identifier databases.
              </li>
            </ul>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-xl font-semibold text-slate-100">2.2 Temporary Storage & Sandbox Files</h3>
            <p>
              During image manipulation (e.g., resizing high-resolution photos or converting formats), the App may temporarily cache working image files in your device&apos;s isolated application sandbox cache.
            </p>
            <p>
              These temporary files are cleared automatically when operations complete or when the application cache is flushed. They are never shared with other applications.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-xl font-semibold text-slate-100">2.3 Saving & Exporting Files</h3>
            <ul className="list-disc list-outside ml-5 space-y-2 text-slate-300">
              <li>
                <strong className="text-white">Saving to Photos:</strong> When you tap &ldquo;Save to Photos&rdquo;, the processed image is written directly to your device&apos;s local photo library.
              </li>
              <li>
                <strong className="text-white">Sharing:</strong> When you tap &ldquo;Share&rdquo;, the processed image is provided strictly to your operating system&apos;s native system share sheet. You retain full control over where and with whom you share your files.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section id="section-3" className="space-y-4">
          <h2 className="text-2xl font-bold text-white border-l-4 border-violet-500 pl-4">
            3. Device Permissions
          </h2>
          <p>
            RightFrame requests only the minimum permissions necessary to deliver the photo editing and export tools you request:
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-700/60 bg-slate-900/40 my-4">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/60 text-slate-200 border-b border-slate-700/60">
                <tr>
                  <th className="py-3 px-4 font-semibold">Platform</th>
                  <th className="py-3 px-4 font-semibold">Permission</th>
                  <th className="py-3 px-4 font-semibold">Purpose & Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-200 whitespace-nowrap">iOS</td>
                  <td className="py-3 px-4 font-mono text-xs text-violet-300">NSCameraUsageDescription</td>
                  <td className="py-3 px-4">Allows you to capture a live portrait or document photo directly within the app for local processing.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-200 whitespace-nowrap">iOS</td>
                  <td className="py-3 px-4 font-mono text-xs text-violet-300">NSPhotoLibraryUsageDescription</td>
                  <td className="py-3 px-4">Allows you to select an existing photo from your library for local processing.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-200 whitespace-nowrap">iOS</td>
                  <td className="py-3 px-4 font-mono text-xs text-violet-300">NSPhotoLibraryAddUsageDescription</td>
                  <td className="py-3 px-4">Allows RightFrame to save your finalized document photo directly to your Photos library (add-only access; does not grant full photo read access).</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-200 whitespace-nowrap">Android</td>
                  <td className="py-3 px-4 font-mono text-xs text-violet-300">android.permission.INTERNET</td>
                  <td className="py-3 px-4">Required by Google Mobile Ads to request and display advertisements and consent forms.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-200 whitespace-nowrap">Android</td>
                  <td className="py-3 px-4 font-mono text-xs text-violet-300">android.permission.ACCESS_NETWORK_STATE</td>
                  <td className="py-3 px-4">Allows the app to verify network availability before initiating ad or consent requests.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-200 whitespace-nowrap">Android</td>
                  <td className="py-3 px-4 font-mono text-xs text-violet-300">android.permission.WRITE_EXTERNAL_STORAGE (maxSdkVersion 28)</td>
                  <td className="py-3 px-4">Used on legacy Android versions to save exported images to the public gallery. Modern Android versions use scoped storage / MediaStore.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-slate-300">
            <strong className="text-white">RightFrame never requests photo permissions on initial launch.</strong> Permissions are requested strictly at the moment you choose to take a photo, select an image, or save a result.
          </p>
        </section>

        {/* Section 4 */}
        <section id="section-4" className="space-y-4">
          <h2 className="text-2xl font-bold text-white border-l-4 border-violet-500 pl-4">
            4. Third-Party Services: Google Mobile Ads (AdMob)
          </h2>
          <p>
            To keep RightFrame&apos;s photo studio tools free and accessible, we integrate the <strong className="text-white">Google Mobile Ads SDK</strong> (provided by Google LLC and Google Ireland Limited).
          </p>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-slate-100">4.1 Data Processed by Google Mobile Ads</h3>
            <p>
              While RightFrame itself does not collect personal data, Google Mobile Ads may collect and process certain telemetry and device information in accordance with{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 underline underline-offset-4"
              >
                Google&apos;s Privacy Policy
              </a>, including:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 text-slate-300">
              <li>
                <strong className="text-white">IP Address:</strong> Used to determine general coarse location (country, state, or city) to serve geographically relevant ads and detect fraud.
              </li>
              <li>
                <strong className="text-white">Device Identifiers & Telemetry:</strong> Operating system version, device model, carrier, screen size, and mobile advertising identifiers (where permitted by applicable consent and platform settings).
              </li>
              <li>
                <strong className="text-white">Ad Interaction Events:</strong> Impressions, clicks, video views, and ad diagnostic logs to prevent advertising fraud, enforce frequency capping, and calculate publisher earnings.
              </li>
            </ul>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-xl font-semibold text-slate-100">4.2 Personalized vs. Non-Personalized / Limited Ads</h3>
            <ul className="list-disc list-outside ml-5 space-y-2 text-slate-300">
              <li>
                <strong className="text-white">Personalized Ads:</strong> If you provide affirmative consent in regions where consent is legally required, Google may use your device identifier and ad interaction history to deliver personalized advertising.
              </li>
              <li>
                <strong className="text-white">Non-Personalized / Limited Ads:</strong> If you decline consent, or if you reside in a region where consent is withheld or opt-out is exercised, Google Mobile Ads serves non-personalized or limited ads. These ads rely on contextual factors (such as the app type, coarse geographic location, or current content) rather than cross-app behavioral tracking.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5 */}
        <section id="section-5" className="space-y-4">
          <h2 className="text-2xl font-bold text-white border-l-4 border-violet-500 pl-4">
            5. Google User Messaging Platform (UMP) & Regional Consent
          </h2>
          <p>
            RightFrame integrates Google&apos;s official <strong className="text-white">User Messaging Platform (UMP)</strong> SDK to manage privacy disclosures and consent collection in compliance with international data protection laws.
          </p>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-slate-100">5.1 European Economic Area (EEA), United Kingdom & Switzerland</h3>
            <p>
              In accordance with the <strong className="text-white">General Data Protection Regulation (GDPR)</strong>, <strong className="text-white">UK GDPR</strong>, and the <strong className="text-white">Swiss Federal Act on Data Protection (FADP)</strong>:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 text-slate-300">
              <li>RightFrame implements the <strong className="text-white">IAB Europe Transparency and Consent Framework (TCF v2.2)</strong> via Google UMP.</li>
              <li>Before loading advertisements, users in the EEA, UK, and Switzerland are presented with a certified consent message.</li>
              <li>You have the right to grant, refuse, or customize consent for individual advertising purposes and third-party ad technology partners.</li>
              <li>
                <strong className="text-white">Consent Gating:</strong> If consent is not obtained or is refused, RightFrame strictly withholds advertising requests or serves only legally permissible limited ads.
              </li>
              <li>
                <strong className="text-white">Right to Withdraw / Privacy Options:</strong> You can review or modify your consent choices at any time by tapping <strong className="text-white">Settings / Shield icon &gt; Manage Privacy Options</strong> directly inside RightFrame.
              </li>
            </ul>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-xl font-semibold text-slate-100">5.2 United States (California CCPA/CPRA, Virginia, Colorado, Connecticut, Utah, etc.)</h3>
            <p>Under applicable US state privacy laws:</p>
            <ul className="list-disc list-outside ml-5 space-y-2 text-slate-300">
              <li>We disclose that Google Mobile Ads may process identifiers and network activity for targeted advertising or cross-context behavioral advertising.</li>
              <li>RightFrame does not sell your personal data or photos for monetary consideration.</li>
              <li>You may exercise your right to opt out of targeted advertising through the Google UMP privacy message or the in-app <strong className="text-white">Manage Privacy Options</strong> entry point.</li>
            </ul>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-xl font-semibold text-slate-100">5.3 Offline & Failure Behavior</h3>
            <p>
              If you are offline, or if Google&apos;s consent servers fail to respond, RightFrame <strong className="text-white">fails safely open for the user</strong>: advertising is withheld, while all photo compression, resizing, and document tools remain 100% available without interruption.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section id="section-6" className="space-y-4">
          <h2 className="text-2xl font-bold text-white border-l-4 border-violet-500 pl-4">
            6. Apple App Tracking Transparency (ATT) & iOS Privacy
          </h2>
          <ul className="list-disc list-outside ml-5 space-y-2 text-slate-300">
            <li>
              <strong className="text-white">No Cross-App Tracking:</strong> RightFrame does not track users across other companies&apos; apps and websites, does not access Apple&apos;s Identifier for Advertisers (IDFA) for cross-app behavioral targeting, and does not share your data with data brokers.
            </li>
            <li>
              <strong className="text-white">SKAdNetwork Attribution:</strong> On iOS, ad performance and attribution are evaluated using Apple&apos;s privacy-preserving <strong className="text-white">SKAdNetwork</strong> framework, which does not link device identities or track users across applications.
            </li>
            <li>
              Because RightFrame does not engage in tracking as defined by Apple, an App Tracking Transparency (ATT) permission prompt is not presented, ensuring a seamless, non-intrusive experience while fully adhering to Apple App Store Review Guideline 5.1.2.
            </li>
          </ul>
        </section>

        {/* Section 7 */}
        <section id="section-7" className="space-y-4">
          <h2 className="text-2xl font-bold text-white border-l-4 border-violet-500 pl-4">
            7. Data Retention & Security
          </h2>
          <ul className="list-disc list-outside ml-5 space-y-2 text-slate-300">
            <li>
              <strong className="text-white">RightFrame Processing Data:</strong> Retained for <strong className="text-white">0 days</strong> on remote servers. Photos and signatures exist only in your device&apos;s memory and temporary app cache during active processing.
            </li>
            <li>
              <strong className="text-white">Advertising Telemetry:</strong> Any telemetry collected by Google Mobile Ads is retained according to{' '}
              <a
                href="https://policies.google.com/technologies/retention"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 underline underline-offset-4"
              >
                Google&apos;s Data Retention Policies
              </a>.
            </li>
            <li>
              <strong className="text-white">Security:</strong> All processing takes place within your operating system&apos;s sandboxed environment. System export mechanisms rely exclusively on standard operating system security controls.
            </li>
          </ul>
        </section>

        {/* Section 8 */}
        <section id="section-8" className="space-y-4">
          <h2 className="text-2xl font-bold text-white border-l-4 border-violet-500 pl-4">
            8. Children’s Privacy
          </h2>
          <p>
            RightFrame is a general-purpose utility designed for individuals creating document and portrait photos. RightFrame is not directed to children under 13 years of age (or under 16 in the European Union and United Kingdom). We do not knowingly collect personal information from children.
          </p>
        </section>

        {/* Section 9 */}
        <section id="section-9" className="space-y-4">
          <h2 className="text-2xl font-bold text-white border-l-4 border-violet-500 pl-4">
            9. Your Rights & How to Exercise Them
          </h2>
          <p>
            Depending on your jurisdiction, you have specific rights under data protection laws (such as GDPR or CCPA/CPRA):
          </p>
          <ul className="list-disc list-outside ml-5 space-y-2 text-slate-300">
            <li>
              <strong className="text-white">Right to Access & Portability:</strong> All photos and generated documents are saved directly to your device and are in your immediate possession.
            </li>
            <li>
              <strong className="text-white">Right to Erasure:</strong> Deleting a photo from your device&apos;s photo library or uninstalling the app permanently purges all local app data.
            </li>
            <li>
              <strong className="text-white">Right to Withdraw Consent / Opt-Out:</strong> You can withdraw or adjust your advertising consent at any time inside RightFrame by navigating to <strong className="text-white">Settings / Privacy &gt; Manage Privacy Options</strong>.
            </li>
            <li>
              <strong className="text-white">Right to Lodge a Complaint:</strong> You have the right to lodge a complaint with your local data protection supervisory authority.
            </li>
          </ul>
        </section>

        {/* Section 10 */}
        <section id="section-10" className="space-y-4">
          <h2 className="text-2xl font-bold text-white border-l-4 border-violet-500 pl-4">
            10. Contact Information & Inquiries
          </h2>
          <p>
            If you have questions, feedback, or concerns regarding this Privacy Policy or RightFrame&apos;s privacy practices, please contact the developer directly:
          </p>
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-sm sm:text-base">
            <div>
              <strong className="text-slate-300">Developer:</strong>{' '}
              <span className="text-white">Otmane El Baghazaoui (Independent Developer)</span>
            </div>
            <div>
              <strong className="text-slate-300">Email:</strong>{' '}
              <a
                href="mailto:otmane.elbaghazaoui@gmail.com"
                className="text-violet-400 hover:text-violet-300 underline underline-offset-4 font-mono text-sm"
              >
                otmane.elbaghazaoui@gmail.com
              </a>
            </div>
            <div>
              <strong className="text-slate-300">Country of Operation / Jurisdiction:</strong>{' '}
              <span className="text-white">Morocco</span>
            </div>
            <div>
              <strong className="text-slate-300">Public Policy URL:</strong>{' '}
              <a
                href="https://otmaneportfolio.vercel.app/rightframe/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 underline underline-offset-4 font-mono text-sm"
              >
                https://otmaneportfolio.vercel.app/rightframe/privacy-policy
              </a>
            </div>
          </div>
        </section>

        {/* Section 11 */}
        <section id="section-11" className="space-y-4">
          <h2 className="text-2xl font-bold text-white border-l-4 border-violet-500 pl-4">
            11. Changes to This Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy periodically to reflect enhancements to RightFrame, regulatory updates, or changes to advertising network requirements. The updated policy will always be accessible within the application and at our hosted policy URL. Continued use of the App following any changes indicates acceptance of the updated policy.
          </p>
        </section>
      </div>

      {/* Standalone Legal Document Footer */}
      <footer className="mt-16 pt-8 border-t border-slate-800/80 text-center text-xs text-slate-500">
        <p>© 2026 RightFrame. All rights reserved.</p>
      </footer>
    </article>
  );
}
