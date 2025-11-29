import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/homepage/Footer';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, Quote, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "About - Kurukshetra.info The Intellectual Battlefield for Bharat's Civilizational Future",
  description:
    "Learn about Kurukshetra's mission to restore truth and dharma in modern discourse. Facts speak, lies lie on the ground. Join our civilizational movement.",
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-red-50/30">
      <Header />

      <main className="container mx-auto !px-4 !py-3">
        <header className="text-center px-5 mb-8">
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent mb-6 relative z-10 p-5 tracking-tight">
              कुरुक्षेत्र
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-red-200 blur-3xl opacity-30 -z-10 scale-150"></div>
          </div>
          <div className="w-32 h-1.5 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 mx-auto mt-6 rounded-full shadow-lg"></div>
          <p className="sr-only">Kurukshetra - The intellectual battlefield for dharma restoration</p>
        </header>

        <section className="text-center mb-20" aria-labelledby="sacred-verses">
          <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-orange-200/60 overflow-hidden max-w-6xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 p-1 rounded-3xl">
              <div className="bg-white rounded-[calc(1.5rem-4px)] h-full w-full"></div>
            </div>

            <div className="relative z-10 p-10 md:p-16">
              <blockquote className="text-center mb-10">
                <div className="text-2xl md:text-5xl leading-relaxed text-gray-800 font-semibold space-y-4 mb-10 tracking-wide">
                  <p className="hover:text-orange-700 text-2xl md:text-3xl transition-colors duration-300">"यदा यदा हि धर्मस्य ग्लानिर्भवति भारत ।"</p>
                  <p className="hover:text-red-700 text-1xl md:text-3xl transition-colors duration-300">"अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्‌ ॥"</p>
                  <p className="hover:text-orange-700 text-2xl md:text-3xl transition-colors duration-300">"परित्राणाय साधूनां विनाशाय च दुष्कृताम्‌ ।"</p>
                  <p className="hover:text-red-700 text-1xl md:text-3xl transition-colors duration-300">"धर्मसंस्थापनार्थाय सम्भवामि युगे युगे ॥"</p>
                </div>

                <div className="relative">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent"></div>
                  <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 rounded-2xl p-8 mt-8 border border-orange-200/50 shadow-inner">
                    <cite className="text-gray-800 italic text-xl md:text-2xl leading-relaxed font-medium">
                      "Whenever Dharma starts fading into oblivion and Adharma increases, I manifest myself (the formless assumes form – an avataar of the Supreme takes birth). I take birth in every age to protect the virtuous, to annihilate the evil-doers and to establish (and re-establish) Dharma."
                    </cite>
                  </div>
                </div>
              </blockquote>
            </div>
          </div>
        </section>

        <article className="max-w-6xl mx-auto space-y-16" role="main">
          <section className="relative group" aria-labelledby="contemporary-crisis">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 to-red-100/20 rounded-3xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-gray-200/60 p-10 md:p-16 hover:shadow-3xl transition-all duration-500">
              <header className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-2 h-12 bg-gradient-to-b from-orange-500 to-red-600 rounded-full mr-4"></div>
                  <h2 id="contemporary-crisis" className="text-2xl md:text-3xl font-bold text-gray-800">
                    The Contemporary Crisis
                  </h2>
                </div>
                <div className="w-24 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 ml-6"></div>
              </header>

              <div className="relative">
                {/* Decorative quote mark */}
                <div className="absolute -top-4 -left-2 text-6xl text-orange-200 font-serif">"</div>
                <p className="text-xl md:text-2xl leading-relaxed text-gray-800 font-light first-letter:text-7xl first-letter:font-bold first-letter:text-orange-600 first-letter:float-left first-letter:mr-4 first-letter:mt-3 first-letter:leading-none pl-2">
                  The contemporary epoch is characterized by a pervasive erosion of ethical norms, where malevolent forces—conceptualized here through the Indic figures of adharma and the malechha—transcend parochial divisions of identity. In this climate, truth is systematically suppressed, and archetypes of tyranny, akin to the Kalyugi Ravana and Kamsa, proliferate. Consequently, the current trajectory of human history appears increasingly chaotic. The principles of truth and justice have been subordinated, marginalized by systemic injustice and unrighteousness. Innocence and veracity are now frequently disdained, eclipsed by a prevailing culture that valorizes cunning and animosity as emergent social virtues. This phenomenon suggests a convergence of destructive tendencies, as if the archetypal asuras of every age are manifesting concurrently, threatening to dismantle the foundational virtues and ethics of human civilization.
                </p>
                <div className="absolute -bottom-4 -right-2 text-6xl text-orange-200 font-serif rotate-180">"</div>
              </div>
            </div>
          </section>

          {/* Section 2: Ideological Hegemony - Enhanced */}
          <section className="relative group" aria-labelledby="ideological-hegemony">
            <div className="absolute inset-0 bg-gradient-to-br from-red-100/20 to-orange-100/20 rounded-3xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-gray-200/60 p-10 md:p-16 hover:shadow-3xl transition-all duration-500">
              {/* Section header */}
              <header className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-2 h-12 bg-gradient-to-b from-red-500 to-orange-600 rounded-full mr-4"></div>
                  <h2 id="ideological-hegemony" className="text-2xl md:text-3xl font-bold text-gray-800">
                    The Ascendancy of Asuric Forces
                  </h2>
                </div>
                <div className="w-24 h-0.5 bg-gradient-to-r from-red-400 to-orange-500 ml-6"></div>
              </header>

              <div className="relative">
                {/* Side decoration */}
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-red-400 to-orange-500 rounded-full opacity-30"></div>
                <div className="pl-8">
                  <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-light relative">
                    <span className="absolute -left-6 top-0 w-3 h-3 bg-red-500 rounded-full opacity-60"></span>
                    The ascendancy of these asuric forces—who often operate under the guise of certain intellectual frameworks, including far-left and Marxist ideologies that are fundamentally oppositional to traditional social and national structures—has established a new literary hegemony. This paradigm shift has precipitated the marginalization of virtuous social norms, veracity, indigenous Indic narratives, and nationalistic sentiment, as these are progressively supplanted by fabricated myths and historical distortions. A systematic campaign inculcates within the citizens of a once-glorious civilization a pervasive sense of self-loathing, an aversion for their own illustrious past, and a particular animus towards all elements categorized as "Hindu." Within this discursive landscape, manufactured falsehoods are promulgated as incontrovertible truths. This phenomenon extends beyond the established mainstream literary intelligentsia; the proliferation of countless entities, analogous to the mythological Raktabija—whose propagation seems inexorable—poses an existential threat to the nation's unity, its rootedness in a glorious antiquity, and its collective honor.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Kurukshetra's Purpose - Enhanced */}
          <section className="relative group" aria-labelledby="kurukshetra-purpose">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 to-amber-100/30 rounded-3xl transform rotate-0.5 group-hover:rotate-0 transition-transform duration-500"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-orange-300/60 p-10 md:p-16 hover:shadow-3xl transition-all duration-500">
              {/* Section header with emphasis */}
              <header className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-4">
                    <div className="w-2 h-8 bg-white rounded-full"></div>
                  </div>
                  <h2 id="kurukshetra-purpose" className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Kurukshetra's Civilizational Imperative
                  </h2>
                </div>
                <div className="w-32 h-1 bg-gradient-to-r from-orange-400 via-red-500 to-orange-500 ml-16 rounded-full"></div>
              </header>

              <div className="relative">
                {/* Highlight box */}
                <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-red-50 rounded-2xl p-6 mb-6 border-l-4 border-orange-500">
                  <div className="text-sm font-semibold text-orange-700 mb-2 uppercase tracking-wide">
                    Our Mission Statement
                  </div>
                </div>

                <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-light">
                  In the face of this formidable ideological colonization, the emergence of a robust, intellectually rigorous counter-narrative is not merely an option but a civilizational imperative. It is precisely within this vacuum of authentic representation that this platform, KURUKSHETRA, situates its purpose. We position ourselves as a vanguard in the reclamation of the Indic intellectual sphere, committed to being a forerunner of narratives grounded in the profound wisdom of Bharat's ancient traditions. Our mission is to mount a formidable and scholarly opposition to the established literary hegemony, which has long monopolized discourse with a framework often alien to the indigenous consciousness. We stand, unequivocally, as flagbearers of Dharma—not merely as religious identity, but as the eternal principle of cosmic order, righteousness, and ethical duty—and of a enlightened nationalism that draws its vitality from a deep, unapologetic rootedness in this sacred geography.
                </p>

                {/* Decorative elements */}
                <div className="flex justify-center mt-8">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Inspiration Section - Enhanced */}
          <section className="relative" aria-labelledby="our-inspiration">
            <div className="bg-white rounded-3xl shadow-2xl border-2 border-orange-200/60 overflow-hidden">
              {/* Header with gradient background */}
              <header className="relative bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 p-8 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
                <div className="relative z-10 text-center">
                  <Heart className="w-12 h-12 mx-auto mb-4" />
                  <h2 id="our-inspiration" className="text-3xl md:text-4xl font-bold mb-3">
                    Our Inspiration
                  </h2>
                  <div className="w-20 h-1 bg-white/50 mx-auto rounded-full"></div>
                  <p className="text-orange-100 mt-3 text-lg">
                    The guiding light of our movement
                  </p>
                </div>
              </header>

              <div className="p-10 md:p-16">
                <div className="flex flex-col lg:flex-row items-center gap-10 mb-10">
                  <figure className="flex-shrink-0">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                      <div className="relative w-72 h-72 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                        <Image
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          src="https://i.ibb.co/zWRRjQXX/099ebea2-575c-43fe-a921-47cf3c4eb2be.jpg"
                          width={300}
                          height={300}
                          alt="Shri Rajiv Dixit"
                        />
                      </div>
                      <figcaption className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
                          श्री राजीव दीक्षित
                        </div>
                      </figcaption>
                    </div>
                  </figure>

                  <div className="flex-1">
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-8 text-center lg:text-left">
                      Shri Rajiv Dixit
                    </h3>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 rounded-2xl transform rotate-1"></div>
                  <blockquote className="relative bg-white rounded-2xl p-8 shadow-lg border border-orange-200/50">
                    <div className="absolute -top-3 -left-3 w-6 h-6 bg-orange-500 rounded-full"></div>
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-red-500 rounded-full"></div>
                    <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-light">
                      The foundational ethos of this initiative is a profound debt to the legacy of the late Shri Rajiv Dixit. His life's work stands as the ultimate source of inspiration and the intellectual bedrock upon which our resolve is built. A visionary orator and a meticulous researcher, Shri Rajiv Dixit dedicated his existence to the awakening of the Bharatiya spirit, arming the common citizen with irrefutable facts, historical evidence, and a powerful critique of systemic biases. It was through his seminal lectures that the architecture of our understanding was first formed. His unwavering commitment to uncovering the truths of Bharat's history, its scientific heritage, and its economic subjugation provided the very lens through which we analyze the contemporary crisis. This website is, in many ways, a continuation of his unfinished revolution—an endeavor to translate his oral legacy into an enduring literary and scholarly movement.
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </section>

          {/* Fourth paragraph - Enhanced */}
          <section className="relative group" aria-labelledby="our-commitment">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 to-orange-100/20 rounded-3xl transform -rotate-0.5 group-hover:rotate-0 transition-transform duration-500"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-amber-200/60 p-10 md:p-16 hover:shadow-3xl transition-all duration-500">
              {/* Section header */}
              <header className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mr-4">
                    <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <h2 id="our-commitment" className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Our Commitment & Vision
                  </h2>
                </div>
                <div className="w-32 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 ml-16 rounded-full"></div>
              </header>

              <div className="relative">
                <div className="pl-8 relative">
                  <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-light relative">
                    <span className="text-3xl text-amber-400 font-serif absolute -left-6 -top-2">"</span>
                    Our commitment extends beyond mere reaction. We endeavor to be a fountainhead of original research, insightful analysis, and articulate discourse that re-centers the Indic paradigm. Each article, essay, and critique published here will be guided by the twin lights of intellectual integrity and civilizational devotion. We will systematically deconstruct the prevailing distortions while simultaneously reconstructing a proud and accurate narrative of our past, a clear-eyed assessment of our present, and a visionary roadmap for our future. We invite every seeker of truth, every patriot, and every individual who feels the stirring of their ancestral memory to join us in this critical endeavor. Together, we shall endeavor to restore the voice of Dharma and rekindle the intellectual sovereignty of Bharat.
                    <span className="text-3xl text-orange-400 font-serif absolute -bottom-4 -right-2 rotate-180">"</span>
                  </p>
                </div>

                {/* Bottom decorative section */}
                <div className="mt-10 pt-8 border-t border-gradient-to-r from-amber-200 to-orange-200">
                  <div className="flex justify-center items-center space-x-8">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <div className="text-white font-bold text-sm">धर्म</div>
                      </div>
                      <div className="text-xs text-gray-600 font-medium">Dharm</div>
                    </div>
                    <div className="w-16 h-px bg-gradient-to-r from-amber-300 to-orange-300"></div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <div className="text-white font-bold text-sm">ज्ञान</div>
                      </div>
                      <div className="text-xs text-gray-600 font-medium">Knowledge</div>
                    </div>
                    <div className="w-16 h-px bg-gradient-to-r from-orange-300 to-amber-300"></div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <div className="text-white font-bold text-sm">युद्ध</div>
                      </div>
                      <div className="text-xs text-gray-600 font-medium">Battle</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action - Enhanced */}
          <section className="relative bg-gradient-to-br from-orange-600 via-red-600 to-orange-700 rounded-2xl overflow-hidden shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-x-48 -translate-y-48"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-white/10 to-transparent rounded-full translate-x-48 translate-y-48"></div>

            <div className="relative z-10 p-8 md:p-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <p className="text-white text-lg md:text-xl leading-relaxed font-light mb-6">
                  The conch shell of Kurukshetra is sounded once more, not on a field of earthly combat, but on the intellectual and spiritual battlefield of our age. This platform is that sacred ground where the civilizational war for the soul of Bharat must be waged and won. We do not merely invite you to read; we call upon every true Bharatiya to take up their rightful place in this dharma-yuddha. In this struggle, you are both Arjuna, the warrior grappling with doubt and confronting a formidable adversary of distorted narratives, and Bhagwan Sri Krishna, the divine charioteer imparting the timeless wisdom of the Gita—the clarion call of truth and duty.
                </p>
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 border border-white/30">
                    <p className="text-white font-bold text-xl md:text-2xl leading-relaxed">
                      Let us rise together. Shed the paralysis of confusion, arm yourselves with the weapon of discernment, and resolve to fight not for conquest, but for reclamation. Join us at Kurukshetra. Your civilization calls! Bharat Mata calls! Bharatiyata calls!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
        {/* Heroes Gallery Section - Updated with new images */}
        <section className="mt-16 max-w-6xl mx-auto" aria-labelledby="heroes-gallery">
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-orange-200/60 overflow-hidden">
            {/* Header */}
            <header className="bg-gradient-to-r from-orange-600 to-red-600 p-1">
              <div className="bg-white rounded-t-2xl p-8 text-center">
                <h2 id="heroes-gallery" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  OUR HEROES AND GUIDING LIGHTS
                </h2>
              </div>
            </header>

            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Lord Shiva */}
                <figure className="group">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg border-2 border-orange-200 group-hover:border-orange-400 transition-all duration-300">
                    <div className="aspect-[4/5] relative">
                      <Image
                        src="https://i.ibb.co/93rmy2nC/18049e96-9825-435a-a7a2-1262631eff90.jpg"
                        alt="Lord Shiva"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3">
                        <h3 className="font-bold text-lg">महादेव</h3>
                        <p className="text-sm text-orange-200">The Supreme Destroyer of Evil</p>
                      </div>
                    </div>
                  </div>
                  <figcaption className="text-center mt-4">
                    <h3 className="text-lg font-bold text-gray-900">Mahadev</h3>
                    <p className="text-sm text-gray-600 mt-1">The Cosmic Destroyer & Transformer</p>
                  </figcaption>
                </figure>

                {/* Maharana Pratap */}
                <figure className="group">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg border-2 border-orange-200 group-hover:border-orange-400 transition-all duration-300">
                    <div className="aspect-[4/5] relative">
                      <Image
                        src="https://i.ibb.co/whyJRk5C/Maharana-Pratap.jpg"
                        alt="Maharana Pratap"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3">
                        <h3 className="font-bold text-lg">महाराणा प्रताप</h3>
                        <p className="text-sm text-orange-200">The Lion of Mewar</p>
                      </div>
                    </div>
                  </div>
                  <figcaption className="text-center mt-4">
                    <h3 className="text-lg font-bold text-gray-900">Maharana Pratap</h3>
                    <p className="text-sm text-gray-600 mt-1">The Valiant King of Mewar</p>
                  </figcaption>
                </figure>

                {/* Chhatrapati Shivaji Maharaj */}
                <figure className="group">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg border-2 border-orange-200 group-hover:border-orange-400 transition-all duration-300">
                    <div className="aspect-[4/5] relative">
                      <Image
                        src="https://i.ibb.co/GQRXXxS3/image.jpg"
                        alt="Chhatrapati Shivaji Maharaj"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3">
                        <h3 className="font-bold text-lg">छत्रपति शिवाजी महाराज</h3>
                        <p className="text-sm text-orange-200">The Great Maratha Warrior King</p>
                      </div>
                    </div>
                  </div>
                  <figcaption className="text-center mt-4">
                    <h3 className="text-lg font-bold text-gray-900">Chhatrapati Shivaji Maharaj</h3>
                    <p className="text-sm text-gray-600 mt-1">Founder of the Maratha Empire</p>
                  </figcaption>
                </figure>

                {/* Shree Krishna */}
                <figure className="group">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg border-2 border-orange-200 group-hover:border-orange-400 transition-all duration-300">
                    <div className="aspect-[4/5] relative">
                      <Image
                        src="https://i.ibb.co/yBFJWxN4/c2e25d12-184d-4093-a266-612579141a62.jpg"
                        alt="Shree Krishna"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3">
                        <h3 className="font-bold text-lg">श्री कृष्ण</h3>
                        <p className="text-sm text-orange-200">The Divine Charioteer</p>
                      </div>
                    </div>
                  </div>
                  <figcaption className="text-center mt-4">
                    <h3 className="text-lg font-bold text-gray-900">Shree Krishna</h3>
                    <p className="text-sm text-gray-600 mt-1">The Supreme Teacher of Dharma</p>
                  </figcaption>
                </figure>

                {/* Adi Shankaracharya */}
                <figure className="group">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg border-2 border-orange-200 group-hover:border-orange-400 transition-all duration-300">
                    <div className="aspect-[4/5] relative">
                      <Image
                        src="https://i.ibb.co/FkMvvWjD/Adi-Shankaracharya.jpg"
                        alt="Adi Shankaracharya"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3">
                        <h3 className="font-bold text-lg">आदि शंकराचार्य</h3>
                        <p className="text-sm text-orange-200">The Great Philosophical Master</p>
                      </div>
                    </div>
                  </div>
                  <figcaption className="text-center mt-4">
                    <h3 className="text-lg font-bold text-gray-900">Adi Shankaracharya</h3>
                    <p className="text-sm text-gray-600 mt-1">Reviver of Advaita Vedanta</p>
                  </figcaption>
                </figure>

                {/* Shree Hanuman - New */}
                <figure className="group">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg border-2 border-orange-200 group-hover:border-orange-400 transition-all duration-300">
                    <div className="aspect-[4/5] relative">
                      <Image
                        src="https://i.ibb.co/C55pwXsp/25f7150a-c9bc-4d45-8337-e013be75d5d4.jpg"
                        alt="Shree Hanuman"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3">
                        <h3 className="font-bold text-lg">श्री हनुमान</h3>
                        <p className="text-sm text-orange-200">The Devoted Warrior</p>
                      </div>
                    </div>
                  </div>
                  <figcaption className="text-center mt-4">
                    <h3 className="text-lg font-bold text-gray-900">Shree Hanuman</h3>
                    <p className="text-sm text-gray-600 mt-1">The Ultimate Devotee & Protector</p>
                  </figcaption>
                </figure>

                {/* Rani Lakshmi Bai - New */}
                <figure className="group">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg border-2 border-orange-200 group-hover:border-orange-400 transition-all duration-300">
                    <div className="aspect-[4/5] relative">
                      <Image
                        src="https://i.ibb.co/XZq8XjKL/80ece6f6-b933-4bb9-a0b1-f74fbfbb9822.jpg"
                        alt="Rani Lakshmi Bai"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3">
                        <h3 className="font-bold text-lg">रानी लक्ष्मीबाई</h3>
                        <p className="text-sm text-orange-200">The Warrior Queen of Jhansi</p>
                      </div>
                    </div>
                  </div>
                  <figcaption className="text-center mt-4">
                    <h3 className="text-lg font-bold text-gray-900">Rani Lakshmi Bai</h3>
                    <p className="text-sm text-gray-600 mt-1">The Brave Queen of Jhansi</p>
                  </figcaption>
                </figure>

                {/* Chanakya - New */}
                <figure className="group">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg border-2 border-orange-200 group-hover:border-orange-400 transition-all duration-300">
                    <div className="aspect-[4/5] relative">
                      <Image
                        src="https://i.ibb.co/RTxffn1h/IMG-20250926-212916.jpg"
                        alt="Chanakya"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3">
                        <h3 className="font-bold text-lg">चाणक्य</h3>
                        <p className="text-sm text-orange-200">The Master Strategist</p>
                      </div>
                    </div>
                  </div>
                  <figcaption className="text-center mt-4">
                    <h3 className="text-lg font-bold text-gray-900">Chanakya</h3>
                    <p className="text-sm text-gray-600 mt-1">The Great Political Philosopher</p>
                  </figcaption>
                </figure>

                {/* Lord Parshuram - New */}
                <figure className="group">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg border-2 border-orange-200 group-hover:border-orange-400 transition-all duration-300">
                    <div className="aspect-[4/5] relative">
                      <Image
                        src="https://i.ibb.co/20D2t437/Lord-Parshuram.jpg"
                        alt="Lord Parshuram"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3">
                        <h3 className="font-bold text-lg">भगवान परशुराम</h3>
                        <p className="text-sm text-orange-200">The Warrior Avatar</p>
                      </div>
                    </div>
                  </div>
                  <figcaption className="text-center mt-4">
                    <h3 className="text-lg font-bold text-gray-900">Lord Parshuram</h3>
                    <p className="text-sm text-gray-600 mt-1">The Sixth Avatar of Vishnu</p>
                  </figcaption>
                </figure>
              </div>

              {/* Bottom decorative quote */}
              <section className="mt-12 text-center">
                <div className="bg-gradient-to-r from-orange-50 via-red-50 to-orange-50 rounded-2xl p-6 border border-orange-200/50">
                  <blockquote className="text-lg md:text-xl font-medium text-gray-800 italic">
                    "ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय । ॐ शान्तिः शान्तिः शान्तिः ॥"
                  </blockquote>
                </div>
              </section>
            </div>
          </div>
        </section>


        {/* Connect Section - Enhanced */}
        <div className="mt-16 bg-white rounded-2xl shadow-2xl border border-orange-200/50 overflow-hidden max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 p-1">
            <div className="bg-white rounded-t-xl p-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Connect With Us</h2>
              <div className="w-24 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 mx-auto"></div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Social Media */}
              <div>
                <h3 className="text-2xl font-semibold mb-8 text-gray-800 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-3"></div>
                  Follow Our Mission
                </h3>
                <div className="space-y-6">
                  <Link href="https://www.facebook.com/share/15x8YKAjA5/" className="group flex items-center space-x-4 p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Facebook className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="text-gray-800 font-medium">Facebook - Daily Updates & Discussions</span>
                    </div>
                  </Link>
                  <Link href="https://x.com/KURUKSHETRA108?t=-cOx8DWUZF3Oab9z5HNv2g&s=08" className="group flex items-center space-x-4 p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Twitter className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="text-gray-800 font-medium">Twitter - Breaking News & Analysis</span>
                    </div>
                  </Link>
                  <Link href="https://www.instagram.com/kurukshetra108?igsh=MTIxNGtrbGJmaHhkbA==" className="group flex items-center space-x-4 p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Instagram className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="text-gray-800 font-medium">Instagram - Visual Stories & Culture</span>
                    </div>
                  </Link>
                  <Link href="https://youtube.com/@kuruksetra?si=Zsc_6dA1w_6wnwbB" className="group flex items-center space-x-4 p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Youtube className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="text-gray-800 font-medium">YouTube - In-depth Documentaries</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-2xl font-semibold mb-8 text-gray-800 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-3"></div>
                  Get In Touch
                </h3>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200/50">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Editorial Team</p>
                      <p className="text-orange-700 font-medium">kurukshetra5751@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;