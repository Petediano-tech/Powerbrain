'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus } from 'lucide-react';
import { resources, Resource } from '@/lib/resources-data';
import { ResourceCard } from '@/components/resource-card';

const filterTabs = ['All', 'Textbooks', 'Videos', 'Past Papers'];

export default function RepositoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredResources = resources.filter((resource) => {
    const matchesFilter =
      activeFilter === 'All' || resource.type.toLowerCase() === activeFilter.toLowerCase().slice(0, -1);
    const matchesSearch = resource.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="relative min-h-full">
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search textbooks, videos..."
            className="pl-10 h-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {filterTabs.map((tab) => (
            <Button
              key={tab}
              variant={activeFilter === tab ? 'default' : 'secondary'}
              onClick={() => setActiveFilter(tab)}
              className="rounded-full px-4"
            >
              {tab}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>

      <div className="fixed bottom-24 right-6 md:bottom-8 z-20">
        <Button className="rounded-full h-14 w-auto px-6 shadow-lg" size="lg">
          <Plus className="mr-2 h-5 w-5" />
          Suggest Resource
        </Button>
      </div>
    </div>
  );
}
