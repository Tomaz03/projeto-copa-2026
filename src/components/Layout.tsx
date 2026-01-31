import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Trophy,
  LogOut,
  User as UserIcon,
  LayoutDashboard,
  Settings,
  ListOrdered,
  ChevronRight,
  ShieldCheck,
  Home,
  FileText,
  Users
} from 'lucide-react';
import { ROUTE_PATHS, BOLAOO_CONFIG } from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { IMAGES } from '@/assets/images';
import logo from '@/assets/logo.png';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
  authOnly?: boolean;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isAdmin, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems: NavItem[] = [
    { label: 'Início', path: ROUTE_PATHS.HOME, icon: <Home className="w-4 h-4" /> },
    { label: 'Ranking', path: ROUTE_PATHS.RANKING, icon: <ListOrdered className="w-4 h-4" /> },
    { label: 'Regras', path: ROUTE_PATHS.RULES, icon: <FileText className="w-4 h-4" /> },
    { label: 'Seleções', path: ROUTE_PATHS.TEAMS, icon: <Users className="w-4 h-4" /> },
  ];

  const authNavItems: NavItem[] = [
    { label: 'Dashboard', path: ROUTE_PATHS.DASHBOARD, icon: <LayoutDashboard className="w-4 h-4" />, authOnly: true },
    { label: 'Meus Palpites', path: ROUTE_PATHS.MY_PREDICTIONS, icon: <Trophy className="w-4 h-4" />, authOnly: true },
  ];

  const adminNavItems: NavItem[] = [
    { label: 'Admin Panel', path: ROUTE_PATHS.ADMIN_DASHBOARD, icon: <ShieldCheck className="w-4 h-4" />, adminOnly: true },
    { label: 'Gerenciar Usuários', path: ROUTE_PATHS.MANAGE_USERS, icon: <UserIcon className="w-4 h-4" />, adminOnly: true },
    { label: 'Lançar Resultados', path: ROUTE_PATHS.MANAGE_RESULTS, icon: <Settings className="w-4 h-4" />, adminOnly: true },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      {/* Navigation Header */}
      <header
        ref={headerRef}
        className={`fixed top-0 w-full z-50 transition-all duration-300 h-16 ${isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
          }`}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to={ROUTE_PATHS.HOME} className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-md overflow-hidden transition-transform group-hover:scale-105">
              <img src={logo} alt="Logo" className="w-full h-full object-cover p-1" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold leading-none tracking-tight">
                COPA <span className="text-primary">2026</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Bolão Oficial</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-semibold rounded-full transition-all ${isActive
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-accent hover:text-accent-foreground text-muted-foreground'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {isAuthenticated && (
              <div className="h-6 w-px bg-border mx-2" />
            )}

            {isAuthenticated && authNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-semibold rounded-full transition-all ${isActive
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-accent hover:text-accent-foreground text-muted-foreground'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {isAdmin && adminNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-semibold rounded-full transition-all ${isActive
                    ? 'bg-destructive/10 text-destructive'
                    : 'hover:bg-destructive/5 hover:text-destructive text-muted-foreground'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* User Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-foreground">{user?.name}</span>
                  <span className="text-[10px] text-primary font-mono">{user?.total_points} PTS</span>
                </div>
                <Button variant="ghost" size="icon" onClick={signOut} className="rounded-full">
                  <LogOut className="w-5 h-5 text-muted-foreground hover:text-destructive transition-colors" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to={ROUTE_PATHS.LOGIN}>
                  <Button variant="ghost" className="font-bold">
                    Entrar
                  </Button>
                </Link>
                <Link to={ROUTE_PATHS.REGISTER}>
                  <Button className="font-bold rounded-full shadow-md hover:shadow-lg transition-all">
                    Criar Conta
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-xl bg-accent text-accent-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-background md:hidden pt-20"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
              <div className="mb-6">
                {isAuthenticated ? (
                  <div className="flex items-center gap-4 p-4 bg-accent/50 rounded-2xl">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <UserIcon className="text-primary-foreground w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold">{user?.name}</p>
                      <p className="text-sm text-primary font-mono">{user?.total_points} Pontos</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link to={ROUTE_PATHS.LOGIN} className="w-full">
                      <Button variant="outline" className="w-full rounded-xl">Login</Button>
                    </Link>
                    <Link to={ROUTE_PATHS.REGISTER} className="w-full">
                      <Button className="w-full rounded-xl">Cadastro</Button>
                    </Link>
                  </div>
                )}
              </div>

              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-2 ml-2">Navegação</p>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="font-semibold">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              ))}

              {isAuthenticated && (
                <>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-4 mb-2 ml-2">Minha Área</p>
                  {authNavItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span className="font-semibold">{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  ))}
                </>
              )}

              {isAdmin && (
                <>
                  <p className="text-[10px] uppercase tracking-widest text-destructive font-bold mt-4 mb-2 ml-2">Administração</p>
                  {adminNavItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-destructive/5 text-destructive transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span className="font-semibold">{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  ))}
                </>
              )}

              {isAuthenticated && (
                <Button
                  variant="ghost"
                  onClick={signOut}
                  className="mt-8 flex items-center gap-3 text-destructive hover:bg-destructive/5 justify-start"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-bold">Sair da Conta</span>
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <main className="flex-1 pt-16">
        {children}
      </main>

      {/* Footer */}
      {location.pathname !== ROUTE_PATHS.HOME && (
        <footer className="bg-card border-t border-border mt-auto">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              <div className="col-span-1 md:col-span-2">
                <Link to={ROUTE_PATHS.HOME} className="flex items-center gap-2 mb-4">
                  <img src={logo} alt="Logo" className="w-6 h-6 object-contain" />
                  <span className="text-xl font-bold tracking-tight">
                    {BOLAOO_CONFIG.TITLE}
                  </span>
                </Link>
                <p className="text-muted-foreground max-w-sm mb-6">
                  O maior bolão amador da Copa do Mundo 2026. Participe, dê seus palpites e dispute o topo do ranking com amigos e fãs de futebol.
                </p>
                <div className="flex gap-4">
                  <img src={IMAGES.FOOTBALL_1} alt="Copa 2026" className="w-12 h-12 object-cover rounded-lg grayscale opacity-50" />
                  <img src={IMAGES.TROPHY_5} alt="Trophy" className="w-12 h-12 object-cover rounded-lg grayscale opacity-50" />
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-4">Navegação</h4>
                <ul className="space-y-2">
                  <li><Link to={ROUTE_PATHS.HOME} className="text-sm text-muted-foreground hover:text-primary transition-colors">Início</Link></li>
                  <li><Link to={ROUTE_PATHS.RANKING} className="text-sm text-muted-foreground hover:text-primary transition-colors">Ranking</Link></li>
                  <li><Link to={ROUTE_PATHS.RULES} className="text-sm text-muted-foreground hover:text-primary transition-colors">Regulamento</Link></li>
                  <li><Link to={ROUTE_PATHS.TEAMS} className="text-sm text-muted-foreground hover:text-primary transition-colors">Seleções</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">Suporte</h4>
                <ul className="space-y-2">
                  <li className="text-sm text-muted-foreground">Email: suporte@bolaocopa2026.com.br</li>
                  <li className="text-sm text-muted-foreground">PIX: {BOLAOO_CONFIG.PIX_KEY}</li>
                  <li className="text-sm text-muted-foreground">Taxa: {BOLAOO_CONFIG.CURRENCY} {BOLAOO_CONFIG.ENTRY_FEE.toFixed(2)}</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-muted-foreground">
                © 2026 {BOLAOO_CONFIG.TITLE}. Todos os direitos reservados.
              </p>
              <div className="flex items-center gap-6">
                <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Termos de Uso</span>
                <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Privacidade</span>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
