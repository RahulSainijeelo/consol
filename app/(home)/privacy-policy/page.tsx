import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/homepage/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Privacy Policy - Kurukshetra",
  description: "Learn how Kurukshetra collects, uses, and protects your personal information. Review our privacy practices and your data rights.",
};

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-red-50/30">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-orange-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-t-2xl">
            <div className="px-8 py-6">
              <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
              <p className="text-orange-100 mt-2">Last Updated: November 5, 2025</p>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8 md:p-12 space-y-8">
            {/* Preamble */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-6 bg-orange-500 rounded-full mr-3"></div>
                Preamble: Our Dharma of Data Stewardship
              </h2>
              <p className="text-gray-700 leading-relaxed">
                KURUKSHETRA ("we," "our," "the Editorial Team") operates the digital publication at kurukshetra.info (the "Site"). Our mission is the articulation and advancement of Bharatiya civilisational thought. This mission extends to how we handle the information of our readers and contributors. We believe privacy is a fundamental principle (<em>mūla siddhānta</em>) of trust.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                This document outlines our practices concerning the minimal data we collect. It is written not merely to comply with statutes, but to articulate a covenant of intellectual integrity with you, our esteemed reader. By engaging with our Site, you align yourself with this covenant.
              </p>
            </section>
            
            {/* Information Collection */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-6 bg-orange-500 rounded-full mr-3"></div>
                The Information We Curate: A Minimalist Approach
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                In line with our focus as a literary and ideational platform, our data collection is intentionally sparse. We do not have user logins, comment sections, or social media integrations that necessitate extensive personal data harvesting.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">A. Information You Voluntarily Provide:</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                This is the primary, and almost exclusive, form of data we hold.
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                <li><strong>Email Address:</strong> Solely for the purpose of subscribing to our newsletter, should you explicitly choose to do so. This is an opt-in, conscious action.</li>
                <li><strong>Correspondence:</strong> If you contact us via our official email (kurukshetra5751@gmail.com), we retain the communication to serve your query and maintain a scholarly record.</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">B. Information Collected Automatically:</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                This is non-personal, anonymized data essential for the <em>yajna</em> of delivering our content to you.
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                <li><strong>Essential Analytics:</strong> We employ a self-respecting, privacy-focused analytics tool (such as Plausible or a similarly minimal setup) that helps us understand aggregate traffic patterns (e.g., number of visitors, popular articles, referring sites). This process deliberately avoids collecting or storing any personally identifiable information. We do not use cookies for tracking, profiling, or advertising. We see no dharma in surveilling our readers.</li>
              </ul>
            </section>
            
            {/* Use of Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-6 bg-orange-500 rounded-full mr-3"></div>
                The Purpose of Knowledge: How We Use This Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The scant information we gather serves a singular, focused purpose: to deepen and disseminate the intellectual discourse of Bharat.
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                <li><strong>The Newsletter:</strong> To deliver our carefully curated essays, analyses, and literary pieces directly to your inbox. Each email will contain a clear, one-click method to revoke this permission.</li>
                <li><strong>Site Integrity:</strong> To ensure the technical functionality and security of kurukshetra.info, protecting it from digital adharma such as malicious attacks.</li>
                <li><strong>Scholarly Refinement:</strong> To understand, in aggregate, which themes and essays resonate most, allowing us to refine our editorial direction and better serve the intellectual <em>samsad</em> (assembly).</li>
              </ul>
            </section>
            
            {/* Non-Negotiable */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-6 bg-orange-500 rounded-full mr-3"></div>
                The Non-Negotiable: How We Do NOT Use Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our stance is absolute and unambiguous:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                <li><strong>No Sale or Barter:</strong> We do not, and shall never, sell, rent, or trade your email address or any other data.</li>
                <li><strong>No Third-Party Profiling:</strong> We do not permit third-party advertising networks to track our readers or place targeting cookies.</li>
                <li><strong>No Psychological Manipulation:</strong> Our content is designed to provoke thought, not to algorithmically exploit attention.</li>
                <li><strong>No Unnecessary Retention:</strong> We do not hold your data indefinitely. Correspondence is archived for a reasonable scholarly period, and you may request its deletion at any time.</li>
              </ul>
            </section>
            
            {/* User Rights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-6 bg-orange-500 rounded-full mr-3"></div>
                Your Intellectual Sovereignty: Rights and Choices
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a sovereign individual in our intellectual community, you possess absolute rights over your data.
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                <li><strong>Access & Portability:</strong> You may request a copy of the minimal personal data we hold about you.</li>
                <li><strong>Correction & Deletion:</strong> You may request that we correct inaccuracies or completely erase your data from our records.</li>
                <li><strong>Dissociation:</strong> You may unsubscribe from our newsletter at any moment, with immediate effect, using the link provided in every email.</li>
              </ul>
              
              <p className="text-gray-700 leading-relaxed mt-4">
                To exercise any of these rights, simply contact us at kurukshetra5751@gmail.com. Your request will be honored with the urgency and respect it deserves.
              </p>
            </section>
            
            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-6 bg-orange-500 rounded-full mr-3"></div>
                The Fortress of Dharma: Our Commitment to Security
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and strategic measures to protect the information under our stewardship. However, in the spirit of <em>satya</em> (truth), we acknowledge that no digital transmission is invulnerable. We pledge to maintain the highest standards of vigilance practicable.
              </p>
            </section>
            
            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-6 bg-orange-500 rounded-full mr-3"></div>
                The Living Document: Amendments to This Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                The world of ideas evolves, and so may this policy. Any future changes will be posted on this page with an updated "Last Updated" date. The core principles of minimalism, transparency, and intellectual stewardship are immutable.
              </p>
            </section>
            
            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-2 h-6 bg-orange-500 rounded-full mr-3"></div>
                Joining the Samsad: Contacting KURUKSHETRA
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For any questions regarding this Privacy Policy or our intellectual stewardship of your data, we welcome your dialogue.
              </p>
              <div className="mt-4 bg-orange-50 rounded-lg p-6 border border-orange-200">
                <p className="text-gray-800 font-medium">The KURUKSHETRA Editorial Team</p>
                <p className="text-gray-700 mt-1">Email: <a href="mailto:kurukshetra5751@gmail.com" className="text-orange-600 hover:underline">kurukshetra5751@gmail.com</a></p>
              </div>
            </section>
            
            {/* Footer */}
            <section className="pt-6 border-t border-gray-200">
              <p className="text-gray-700 leading-relaxed italic">
                By engaging with KURUKSHETRA, you acknowledge that you have read, understood, and consent to the principles enshrined in this policy. Welcome to the discourse.
              </p>
            </section>
          </div>
        </div>
        
        {/* Back button */}
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-full text-white font-medium hover:from-orange-700 hover:to-red-700 transition-all shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Return to Homepage
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;