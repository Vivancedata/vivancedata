"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, TrendingUp, Clock, Layers } from "lucide-react";
import {
  useCases,
  industries,
  businessFunctions,
  complexityLevels,
  type UseCase,
  type Complexity,
} from "@/constants/useCases";

const ALL_FILTER = "all";

// Complexity uses the StatusBadge grammar (token + /10 tint) so the three
// steps stay legible in both modes without a hardcoded palette.
function getComplexityColor(complexity: Complexity): string {
  switch (complexity) {
    case "Low":
      return "border-success bg-success/10 text-success";
    case "Medium":
      return "border-warning bg-warning/10 text-warning";
    case "High":
      return "border-destructive bg-destructive/10 text-destructive";
    default:
      return "border-border bg-muted text-muted-foreground";
  }
}

function getIndustryColor(): string {
  // One neutral chip for every industry. The eight-hue category rainbow
  // predates DESIGN.md, which allows exactly one accent; the label text
  // carries the information.
  return "border-border bg-muted text-muted-foreground";
}

function UseCaseCard({ useCase }: { useCase: UseCase }) {
  return (
    <Card className="h-full flex flex-col transition-colors hover:border-brand/40">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge className={getIndustryColor()}>
            {useCase.industry}
          </Badge>
          <Badge variant="outline">{useCase.function}</Badge>
        </div>
        <CardTitle className="text-lg leading-tight">{useCase.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {useCase.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between pt-0">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1">
            {useCase.technologies.slice(0, 3).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs font-normal"
              >
                {tech}
              </Badge>
            ))}
            {useCase.technologies.length > 3 && (
              <Badge variant="secondary" className="text-xs font-normal">
                +{useCase.technologies.length - 3}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="h-4 w-4 text-brand" />
              </div>
              <p className="text-xs text-muted-foreground">Est. ROI</p>
              <p className="text-sm font-semibold text-brand">
                {useCase.estimatedROI}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">Timeline</p>
              <p className="text-sm font-semibold">
                {useCase.implementationTime}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Layers className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">Complexity</p>
              <Badge
                className={`text-xs ${getComplexityColor(useCase.complexity)}`}
              >
                {useCase.complexity}
              </Badge>
            </div>
          </div>

          <div className="pt-3 border-t">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Key Benefits:
            </p>
            <ul className="space-y-1">
              {useCase.keyBenefits.map((benefit) => (
                <li
                  key={benefit}
                  className="text-xs text-muted-foreground flex items-start"
                >
                  <span className="text-brand mr-2">-</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function UseCasesExplorer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>(ALL_FILTER);
  const [selectedFunction, setSelectedFunction] = useState<string>(ALL_FILTER);
  const [selectedComplexity, setSelectedComplexity] =
    useState<string>(ALL_FILTER);

  const filteredUseCases = useMemo(() => {
    return useCases.filter((useCase) => {
      const matchesSearch =
        searchQuery === "" ||
        useCase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        useCase.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        useCase.technologies.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesIndustry =
        selectedIndustry === ALL_FILTER ||
        useCase.industry === selectedIndustry;

      const matchesFunction =
        selectedFunction === ALL_FILTER ||
        useCase.function === selectedFunction;

      const matchesComplexity =
        selectedComplexity === ALL_FILTER ||
        useCase.complexity === selectedComplexity;

      return (
        matchesSearch &&
        matchesIndustry &&
        matchesFunction &&
        matchesComplexity
      );
    });
  }, [searchQuery, selectedIndustry, selectedFunction, selectedComplexity]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedIndustry(ALL_FILTER);
    setSelectedFunction(ALL_FILTER);
    setSelectedComplexity(ALL_FILTER);
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedIndustry !== ALL_FILTER ||
    selectedFunction !== ALL_FILTER ||
    selectedComplexity !== ALL_FILTER;

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search use cases by title, description, or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                aria-label="Search use cases"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="industry-filter"
                  className="text-sm font-medium mb-2 block"
                >
                  Industry
                </label>
                <Select
                  value={selectedIndustry}
                  onValueChange={setSelectedIndustry}
                >
                  <SelectTrigger id="industry-filter" aria-label="Filter by industry">
                    <SelectValue placeholder="All Industries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL_FILTER}>All Industries</SelectItem>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="function-filter"
                  className="text-sm font-medium mb-2 block"
                >
                  Business Function
                </label>
                <Select
                  value={selectedFunction}
                  onValueChange={setSelectedFunction}
                >
                  <SelectTrigger id="function-filter" aria-label="Filter by business function">
                    <SelectValue placeholder="All Functions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL_FILTER}>All Functions</SelectItem>
                    {businessFunctions.map((func) => (
                      <SelectItem key={func} value={func}>
                        {func}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="complexity-filter"
                  className="text-sm font-medium mb-2 block"
                >
                  Complexity
                </label>
                <Select
                  value={selectedComplexity}
                  onValueChange={setSelectedComplexity}
                >
                  <SelectTrigger id="complexity-filter" aria-label="Filter by complexity">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL_FILTER}>All Levels</SelectItem>
                    {complexityLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Count and Clear */}
            <div className="flex items-center justify-between pt-2">
              <p className="text-sm text-muted-foreground">
                Showing {filteredUseCases.length} of {useCases.length} use cases
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-brand hover:underline focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Use Cases Grid */}
      {filteredUseCases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUseCases.map((useCase) => (
            <UseCaseCard key={useCase.id} useCase={useCase} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No use cases found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters to find what you are
                looking for.
              </p>
              <button
                onClick={clearFilters}
                className="text-brand hover:underline focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded px-2 py-1"
              >
                Clear all filters
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
