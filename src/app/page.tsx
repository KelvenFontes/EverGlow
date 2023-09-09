'use client'

import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaHeadphones, FaMusic, FaSpotify, FaStar } from 'react-icons/fa'; // Importe o ícone do Spotify


export default function Home() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col bg-gradient-to-b from-primary to-dark min-h-screen">
      {/* Cabeçalho */}
      <header className="fixed z-50 top-0 left-0 right-0 bg-opacity-80 bg-primary backdrop-blur-md py-4">
        <div className="container mx-auto flex items-center justify-around">
          <div>
            <Image src="/logoTransparente.png" width={220} height={80} alt="logo" />
          </div>
          {/* Botão de Hambúrguer (oculto no desktop) */}
          <button
            className="md:hidden text-white text-2xl focus:outline-none"
            onClick={toggleMobileMenu}
          >
            &#9776;
          </button>
          {/* Menu de Navegação (visível no desktop) */}
          <nav className="hidden md:flex space-x-4">
            <ul className="flex space-x-4 text-gray-100">
              <li><Link href="/">Início</Link></li>
              <li><Link href="/sobre">Sobre</Link></li>
              <li><Link href="/portfolio">Portfólio</Link></li>
              <li><Link href="/contato">Contato</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      {/* Menu Móvel (visível apenas no modo mobile) */}
      <nav
        id="mobile-menu"
        className={`fixed top-0 left-0 w-full h-full bg-primary text-white z-50 transform transition-transform ease-in-out duration-300 ${isMenuOpen ? 'translate-x-full' : '-translate-x-0'}`}
      >
        <ul className="flex flex-col items-center justify-center h-full space-y-4">
          <li><Link href="/">Início</Link></li>
          <li><Link href="/sobre">Sobre</Link></li>
          <li><Link href="/portfolio">Portfólio</Link></li>
          <li><Link href="/contato">Contato</Link></li>
        </ul>
        <button
          className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
          onClick={toggleMobileMenu}
        >
          &#10006;
        </button>
      </nav>

      {/* Seção com Descrição à Esquerda e Imagem à Direita */}
      <div className="container mx-auto mt-6 flex flex-col md:flex-row items-center py-16">
        {/* Descrição à Esquerda */}
        <div className="md:w-1/2 p-6">
          <h2 className="text-3xl font-bold text-gray-100 mb-4">Descubra a Música com EverGlow</h2>
          <p className="text-gray-800">
            Das últimas faixas aos maiores sucessos, ouça suas músicas favoritas no EverGlow agora!
          </p>
          {/* Botões */}
          <div className="mt-6">
            <Button>
              <Link href={'/Signin'}>
                Get Started
              </Link>
            </Button>
            <Button variant="dark" className="ml-10 py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out">
              Tour
            </Button>
          </div>
          {/* Desenvolvido com a API do Spotify */}
          <div className="mt-6 flex items-center">
            <span className="text-gray-50">Desenvolvido com a API do</span>
            <FaSpotify className="text-green-400 ml-2 text-2xl" /> {/* Ícone do Spotify */}
          </div>
        </div>

        {/* Imagem de Celular com App à Direita */}
        <div className="md:w-1/2 p-6 flex justify-center">
          <div className="relative w-[300px] h-[600px]">
            <Image
              src="/mobile.png"
              layout="fill"
              objectFit="cover"
              alt="Imagem do Celular com App"
            />
          </div>
        </div>
      </div>

      {/* Seção de Recursos */}
      <section className="py-16 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Recursos do EverGlow</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Recurso 1 */}
            <div className="bg-opacity-70 p-6 rounded-lg hover:bg-opacity-90 transition duration-300 ease-in-out">
              <FaHeadphones className="text-green-400 text-4xl mx-auto mb-4" /> {/* Ícone de Fones de Ouvido */}
              <h3 className="text-xl font-semibold mb-2">Ouvir Músicas</h3>
              <p className="text-gray-200">Ouça suas músicas favoritas em alta qualidade.</p>
            </div>
            {/* Recurso 2 */}
            <div className="bg-opacity-70 p-6 rounded-lg hover-bg-opacity-90 transition duration-300 ease-in-out">
              <FaMusic className="text-yellow-400 text-4xl mx-auto mb-4" /> {/* Ícone de Notas Musicais */}
              <h3 className="text-xl font-semibold mb-2">Descobrir Novas Músicas</h3>
              <p className="text-gray-200">Explore novas músicas e artistas facilmente.</p>
            </div>
            {/* Recurso 3 */}
            <div className="bg-opacity-70 p-6 rounded-lg hover:bg-opacity-90 transition duration-300 ease-in-out">
              <FaStar className="text-pink-400 text-4xl mx-auto mb-4" /> {/* Ícone de Estrela */}
              <h3 className="text-xl font-semibold mb-2">Playlists Personalizadas</h3>
              <p className="text-gray-200">Crie playlists personalizadas com suas músicas preferidas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos */}
      <section className="bg-gradient-to-t from-dark to-primary py-16 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Depoimentos de Usuários</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Depoimento 1 */}
            <div className="p-6 rounded-lg border border-white">
              <p className="text-gray-200">
                EverGlow tornou minha experiência musical incrível. Eu descobri tantas músicas novas que agora são minhas favoritas.
              </p>
              <p className="text-yellow-400 mt-4">- Sarah M.</p>
            </div>
            {/* Depoimento 2 */}
            <div className="p-6 rounded-lg border border-white">
              <p className="text-gray-200">
                As playlists personalizadas do EverGlow são perfeitas para qualquer ocasião. Eu não consigo parar de usá-las!
              </p>
              <p className="text-yellow-400 mt-4">- John D.</p>
            </div>
            {/* Depoimento 3 */}
            <div className="p-6 rounded-lg border border-white">
              <p className="text-gray-200">
                A integração com o Spotify é incrível. Agora posso acessar todas as minhas músicas favoritas em um só lugar.
              </p>
              <p className="text-yellow-400 mt-4">- Emily R.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Captura de Emails */}
      <section className="bg-dark py-16 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Inscreva-se para Atualizações</h2>
          <p className="text-gray-200">Receba as últimas novidades, dicas e atualizações do EverGlow diretamente na sua caixa de entrada.</p>
          <div className="mt-6">
            <input
              type="email"
              placeholder="Seu Email"
              className="w-full px-4 py-2 rounded-md text-gray-800 focus:outline-none"
            />
            <Button className="mt-4">
              Inscrever-se
            </Button>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-dark py-6 text-center text-gray-300">
        <p>&copy; {new Date().getFullYear()} EverGlow. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
