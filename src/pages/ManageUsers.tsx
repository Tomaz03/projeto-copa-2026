import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Users,
  UserCheck,
  UserX,
  Clock,
  ArrowLeft,
  ChevronLeft,
  Filter,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import {
  ROUTE_PATHS,
  User
} from '@/lib/index';
import { AdminUserCard } from '@/components/AdminUserCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';



export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const { toast } = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar usuários',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApprove = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_approved: true })
        .eq('id', userId);

      if (error) throw error;

      setUsers(prev =>
        prev.map(u => u.id === userId ? { ...u, is_approved: true } : u)
      );

      toast({
        title: 'Usuário aprovado',
        description: 'O participante agora tem acesso total ao bolão.',
      });
    } catch (error: any) {
      toast({
        title: 'Erro ao aprovar',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleBlock = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_approved: false })
        .eq('id', userId);

      if (error) throw error;

      setUsers(prev =>
        prev.map(u => u.id === userId ? { ...u, is_approved: false } : u)
      );

      toast({
        title: 'Usuário desaprovado',
        description: 'O acesso do participante foi restrito.',
        variant: 'destructive',
      });
    } catch (error: any) {
      toast({
        title: 'Erro ao bloquear',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'approved' && user.is_approved) ||
        (statusFilter === 'pending' && !user.is_approved);

      return matchesSearch && matchesStatus;
    });
  }, [users, searchTerm, statusFilter]);

  const stats = useMemo(() => ({
    total: users.length,
    pending: users.filter(u => !u.is_approved).length,
    approved: users.filter(u => u.is_approved).length,
  }), [users]);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-200 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <header className="mb-10">
          <Link
            to={ROUTE_PATHS.ADMIN_DASHBOARD}
            className="group inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Voltar para a Central</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary/80 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Administração
              </h2>
              <h1 className="text-4xl font-extrabold tracking-tight text-white">
                Gestão de Participantes
              </h1>
              <p className="text-slate-400 max-w-2xl mt-2">
                Monitore inscrições, valide comprovantes de pagamento PIX e gerencie o acesso de cada participante do bolão.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-full sm:w-64 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  className="pl-10 bg-[#161b22] border-slate-800 text-slate-200 focus:border-primary/50 transition-all rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                onClick={fetchUsers}
                disabled={loading}
                className="bg-[#161b22] border-slate-800 text-slate-200 hover:bg-slate-800"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-8">
          {/* Dashboard Mini-Stats for Users */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-[#161b22] border-slate-800">
              <CardContent className="p-4 flex flex-col items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Aprovados</span>
                <span className="text-2xl font-mono font-bold text-emerald-500 mt-1">{stats.approved}</span>
              </CardContent>
            </Card>
            <Card className="bg-[#161b22] border-slate-800">
              <CardContent className="p-4 flex flex-col items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pendentes</span>
                <span className="text-2xl font-mono font-bold text-amber-500 mt-1">{stats.pending}</span>
              </CardContent>
            </Card>
            <Card className="bg-[#161b22] border-slate-800">
              <CardContent className="p-4 flex flex-col items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Geral</span>
                <span className="text-2xl font-mono font-bold text-slate-200 mt-1">{stats.total}</span>
              </CardContent>
            </Card>
          </div>

          <Tabs
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as any)}
            className="w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <TabsList className="bg-[#161b22] border border-slate-800 p-1 rounded-xl">
                <TabsTrigger value="all" className="rounded-lg px-6 data-[state=active]:bg-primary data-[state=active]:text-white">
                  Todos
                </TabsTrigger>
                <TabsTrigger value="pending" className="rounded-lg px-6 data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-500">
                  Pendentes
                </TabsTrigger>
                <TabsTrigger value="approved" className="rounded-lg px-6 data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-500">
                  Aprovados
                </TabsTrigger>
              </TabsList>
            </div>

            {['all', 'pending', 'approved'].map((status) => (
              <TabsContent key={status} value={status} className="mt-0 focus-visible:outline-none">
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <Skeleton key={i} className="h-48 w-full rounded-2xl bg-[#161b22] border-slate-800" />
                    ))}
                  </div>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {filteredUsers.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-24 bg-[#161b22]/30 rounded-3xl border border-dashed border-slate-800"
                      >
                        <Users className="w-12 h-12 mx-auto text-slate-700 mb-4" />
                        <p className="text-slate-500 font-medium">Nenhum participante encontrado.</p>
                        <Button
                          variant="link"
                          className="mt-4 text-primary"
                          onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
                        >
                          Limpar todos os filtros
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredUsers.map((user) => (
                          <motion.div
                            key={user.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                          >
                            <AdminUserCard
                              user={{
                                ...user,
                                name: user.name || user.full_name || 'Participante'
                              }}
                              onApprove={handleApprove}
                              onBlock={handleBlock}
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div >
  );
}
