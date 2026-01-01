import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
}

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  type: 'birthday' | 'anniversary' | 'other';
}

interface FamilyMember {
  id: number;
  name: string;
  generation: number;
  parents?: number[];
}

export default function Index() {
  const [currentSection, setCurrentSection] = useState<'home' | 'news' | 'gallery' | 'tree' | 'contacts'>('home');
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: 1,
      title: 'Семейный ужин',
      content: 'Замечательно провели время всей семьёй за воскресным ужином. Бабушка приготовила свой фирменный пирог!',
      date: '2026-01-15',
      author: 'Мария'
    },
    {
      id: 2,
      title: 'День рождения Александра',
      content: 'Отпраздновали 50-летие главы семейства. Собрались все родственники, было много подарков и тёплых слов.',
      date: '2026-01-10',
      author: 'Елена'
    }
  ]);

  const [events] = useState<CalendarEvent[]>([
    { id: 1, title: 'День рождения Александра', date: '2026-01-10', type: 'birthday' },
    { id: 2, title: 'Годовщина свадьбы', date: '2026-02-14', type: 'anniversary' },
    { id: 3, title: 'День рождения Марии', date: '2026-03-22', type: 'birthday' },
    { id: 4, title: 'Семейный праздник', date: '2026-05-09', type: 'other' }
  ]);

  const [familyTree] = useState<FamilyMember[]>([
    { id: 1, name: 'Александр Петрович', generation: 1 },
    { id: 2, name: 'Елена Ивановна', generation: 1 },
    { id: 3, name: 'Мария Александровна', generation: 2, parents: [1, 2] },
    { id: 4, name: 'Дмитрий Александрович', generation: 2, parents: [1, 2] },
    { id: 5, name: 'София Дмитриевна', generation: 3, parents: [4] }
  ]);

  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsContent, setNewNewsContent] = useState('');
  const [newNewsAuthor, setNewNewsAuthor] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addNews = () => {
    if (newNewsTitle && newNewsContent && newNewsAuthor) {
      const newItem: NewsItem = {
        id: Date.now(),
        title: newNewsTitle,
        content: newNewsContent,
        date: new Date().toISOString().split('T')[0],
        author: newNewsAuthor
      };
      setNews([newItem, ...news]);
      setNewNewsTitle('');
      setNewNewsContent('');
      setNewNewsAuthor('');
      setIsDialogOpen(false);
    }
  };

  const deleteNews = (id: number) => {
    setNews(news.filter(item => item.id !== id));
  };

  const getEventIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'birthday':
        return 'Cake';
      case 'anniversary':
        return 'Heart';
      default:
        return 'Calendar';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                <Icon name="Home" size={24} className="text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-heading font-bold text-primary">Семейный Портал</h1>
                <p className="text-sm text-muted-foreground">Наша история, наши ценности</p>
              </div>
            </div>
          </div>
          <nav className="flex gap-2 mt-6">
            <Button
              variant={currentSection === 'home' ? 'default' : 'ghost'}
              onClick={() => setCurrentSection('home')}
              className="gap-2"
            >
              <Icon name="Home" size={18} />
              Главная
            </Button>
            <Button
              variant={currentSection === 'news' ? 'default' : 'ghost'}
              onClick={() => setCurrentSection('news')}
              className="gap-2"
            >
              <Icon name="Newspaper" size={18} />
              Новости
            </Button>
            <Button
              variant={currentSection === 'gallery' ? 'default' : 'ghost'}
              onClick={() => setCurrentSection('gallery')}
              className="gap-2"
            >
              <Icon name="Image" size={18} />
              Галерея
            </Button>
            <Button
              variant={currentSection === 'tree' ? 'default' : 'ghost'}
              onClick={() => setCurrentSection('tree')}
              className="gap-2"
            >
              <Icon name="Trees" size={18} />
              Родословная
            </Button>
            <Button
              variant={currentSection === 'contacts' ? 'default' : 'ghost'}
              onClick={() => setCurrentSection('contacts')}
              className="gap-2"
            >
              <Icon name="Users" size={18} />
              Контакты
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {currentSection === 'home' && (
          <div className="animate-fade-in space-y-12">
            <section className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                <Icon name="Home" size={48} className="text-accent" />
              </div>
              <h2 className="text-5xl font-heading font-bold text-primary mb-4">
                Добро пожаловать в наш семейный портал
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Место, где собраны наши истории, воспоминания и традиции. Здесь мы делимся новостями,
                храним фотографии и помним о важных датах.
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-heading text-2xl">
                    <Icon name="Calendar" size={24} className="text-accent" />
                    Предстоящие события
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {events.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                        <Icon name={getEventIcon(event.type)} size={20} className="text-accent mt-1" />
                        <div>
                          <p className="font-semibold text-foreground">{event.title}</p>
                          <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-heading text-2xl">
                    <Icon name="Newspaper" size={24} className="text-accent" />
                    Последние новости
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {news.slice(0, 2).map((item) => (
                      <div key={item.id} className="p-3 rounded-lg bg-secondary/50">
                        <p className="font-semibold text-foreground mb-1">{item.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{item.content}</p>
                        <p className="text-xs text-muted-foreground mt-2">{item.author} • {new Date(item.date).toLocaleDateString('ru-RU')}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentSection === 'news' && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-heading font-bold text-primary">Семейные новости</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Icon name="Plus" size={18} />
                    Добавить новость
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-heading text-2xl">Новая запись</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Заголовок</label>
                      <Input
                        value={newNewsTitle}
                        onChange={(e) => setNewNewsTitle(e.target.value)}
                        placeholder="Название события"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Содержание</label>
                      <Textarea
                        value={newNewsContent}
                        onChange={(e) => setNewNewsContent(e.target.value)}
                        placeholder="Расскажите подробнее..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Автор</label>
                      <Input
                        value={newNewsAuthor}
                        onChange={(e) => setNewNewsAuthor(e.target.value)}
                        placeholder="Ваше имя"
                      />
                    </div>
                    <Button onClick={addNews} className="w-full">
                      Опубликовать
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6">
              {news.map((item) => (
                <Card key={item.id} className="border-2 hover:shadow-lg transition-shadow animate-scale-in">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="font-heading text-2xl mb-2">{item.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {item.author} • {new Date(item.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteNews(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Icon name="Trash2" size={18} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground leading-relaxed">{item.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentSection === 'gallery' && (
          <div className="animate-fade-in">
            <h2 className="text-4xl font-heading font-bold text-primary mb-8">Семейная галерея</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden border-2 hover:shadow-lg transition-shadow group">
                  <div className="aspect-square bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative overflow-hidden">
                    <Icon name="Image" size={48} className="text-muted-foreground group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors" />
                  </div>
                  <CardContent className="pt-4">
                    <p className="font-heading text-lg font-semibold">Семейное фото {i}</p>
                    <p className="text-sm text-muted-foreground">2026</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentSection === 'tree' && (
          <div className="animate-fade-in">
            <h2 className="text-4xl font-heading font-bold text-primary mb-8">Древо семьи</h2>
            <Card className="border-2 p-8">
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-heading font-semibold mb-4 text-accent">Первое поколение</h3>
                  <div className="flex justify-center gap-8">
                    {familyTree.filter(m => m.generation === 1).map((member) => (
                      <div key={member.id} className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-2">
                          <Icon name="User" size={32} className="text-accent" />
                        </div>
                        <p className="font-semibold text-center">{member.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-1/2 top-0 w-0.5 h-8 bg-border" />
                  <div className="text-center">
                    <h3 className="text-2xl font-heading font-semibold mb-4 text-accent">Второе поколение</h3>
                    <div className="flex justify-center gap-8">
                      {familyTree.filter(m => m.generation === 2).map((member) => (
                        <div key={member.id} className="flex flex-col items-center">
                          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-2">
                            <Icon name="User" size={32} className="text-muted-foreground" />
                          </div>
                          <p className="font-semibold text-center">{member.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-1/2 top-0 w-0.5 h-8 bg-border" />
                  <div className="text-center">
                    <h3 className="text-2xl font-heading font-semibold mb-4 text-accent">Третье поколение</h3>
                    <div className="flex justify-center gap-8">
                      {familyTree.filter(m => m.generation === 3).map((member) => (
                        <div key={member.id} className="flex flex-col items-center">
                          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                            <Icon name="User" size={32} className="text-primary" />
                          </div>
                          <p className="font-semibold text-center">{member.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {currentSection === 'contacts' && (
          <div className="animate-fade-in">
            <h2 className="text-4xl font-heading font-bold text-primary mb-8">Контакты семьи</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl flex items-center gap-2">
                    <Icon name="User" size={24} className="text-accent" />
                    Александр Петрович
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" size={18} className="text-muted-foreground" />
                    <span>+7 (999) 123-45-67</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" size={18} className="text-muted-foreground" />
                    <span>aleksandr@family.ru</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" size={18} className="text-muted-foreground" />
                    <span>Москва</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl flex items-center gap-2">
                    <Icon name="User" size={24} className="text-accent" />
                    Елена Ивановна
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" size={18} className="text-muted-foreground" />
                    <span>+7 (999) 234-56-78</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" size={18} className="text-muted-foreground" />
                    <span>elena@family.ru</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" size={18} className="text-muted-foreground" />
                    <span>Москва</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl flex items-center gap-2">
                    <Icon name="User" size={24} className="text-accent" />
                    Мария Александровна
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" size={18} className="text-muted-foreground" />
                    <span>+7 (999) 345-67-89</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" size={18} className="text-muted-foreground" />
                    <span>maria@family.ru</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" size={18} className="text-muted-foreground" />
                    <span>Санкт-Петербург</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl flex items-center gap-2">
                    <Icon name="User" size={24} className="text-accent" />
                    Дмитрий Александрович
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" size={18} className="text-muted-foreground" />
                    <span>+7 (999) 456-78-90</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" size={18} className="text-muted-foreground" />
                    <span>dmitry@family.ru</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" size={18} className="text-muted-foreground" />
                    <span>Москва</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-20 py-8 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© 2026 Семейный портал. Все права защищены.</p>
          <p className="text-sm text-muted-foreground mt-2">Сделано с любовью для нашей семьи</p>
        </div>
      </footer>
    </div>
  );
}