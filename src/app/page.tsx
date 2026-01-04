'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import MarkdownViewer from '@/components/MarkdownViewer';

const SAMPLE_MARKDOWN = `# Comprehensive Gap Analysis: Lanthanide Bioseparation Kinetic Control Framework
## Updated January 2026 — Now Including 24 Literature Extractions

---

## Executive Summary

After systematic review of all **24 literature extractions** (6 new additions), this analysis identifies what we can confidently claim, what remains unclear, and what gaps must be filled to complete the kinetic control framework for the TiB Opinion/Review manuscript.

**Key updates from new extractions:**
1. **Aramini 1996** — Complete k_off series for α-LA (12 Ln) showing MONOTONIC pattern, contrasting with Wang's bell-shaped pH-elution selectivity → proves DIFFERENT kinetic processes yield DIFFERENT selectivity patterns
2. **Parvalbumin Combined** — Resolves Corson-Breen discrepancy: k_off is CONSTANT across Ln series; Corson's 50-fold variation was a methodological artifact
3. **Persson 2008** — Debunks "gadolinium break" myth; proposes four-tetrad model with gradual CN transition
4. **D'Angelo 2011** — Solution ionic radii larger than crystal values; asymmetry parameter peaks at Ho
5. **Berthomieu 2025** — CaMLBT shows OPPOSITE selectivity to LanM (late Ln preferred) despite similar EF-hand motif
6. **Larrinaga 2024** — LanD achieves SF 7.3 with weaker (μM) binding vs LanM's pM affinity; <1 h process

**Bottom line**: The framework is STRENGTHENED by new evidence. We now have a complete k_off series for α-LA, resolution of the Corson-Breen discrepancy, and the critical finding that the same protein shows different selectivity patterns depending on which kinetic process is probed.

---

## Part 1: What We Can Confidently Claim (ROCK SOLID)

### 1.1 Intrinsic Kinetic Variation Exists

| Source | Evidence | Confidence |
|--------|----------|------------|
| Helm & Merbach 2005 | 18-fold k_ex variation across Ln series (Gd³⁺: 8.3×10⁸ s⁻¹ → Yb³⁺: 4.7×10⁷ s⁻¹) | ★★★★★ |
| Mechanism | All [Ln(H₂O)₈]³⁺ follow I_a mechanism; transition state approaches 9-coordinate | ★★★★★ |
| **NEW: D'Angelo 2011** | CN changes gradually 9.1 (La) → 8.2 (Lu), not abruptly at Gd | ★★★★★ |
| **NEW: Persson 2008** | No "gadolinium break" — continuous structural changes divided into four tetrads | ★★★★★ |

**Claim strength**: ROCK SOLID. Multiple EXAFS studies confirm gradual transition.

### 1.2 Kinetics and Thermodynamics Are Independent Parameters

| Source | Evidence | Confidence |
|--------|----------|------------|
| **NEW: Parvalbumin Combined** | Breen 1985: k_off is CONSTANT across Ln series (~0.05 s⁻¹); Corson's 50-fold variation was dye artifact | ★★★★★ |
| Renner 1993 | 10⁴-fold k_off range across 4 gateway variants, only ~5-fold K_d range | ★★★★★ |
| Drake & Falke 1996 | 590-fold k_off range with only 3-fold K_d range (neutral substitutions) | ★★★★★ |
| **NEW: Aramini 1996** | k_off varies 20-fold (La→Lu) while K_d remains CONSTANT | ★★★★★ |

**Critical Update**: The Corson-Breen discrepancy is now RESOLVED. Breen's direct luminescence method with internal cross-validation is more reliable. The apparent k_off variation in Corson was due to rate-limiting dye complexation kinetics — a methodological artifact.

**Claim strength**: ROCK SOLID. The corrected picture: k_off varies across proteins (engineerable via gateway) but is constant for a given site across Ln series.

### 1.3 **NEW: Same Protein, Same Site, DIFFERENT Selectivity Patterns**

This is the most important new finding from Aramini 1996:

| Process | Method | Pattern | Correlation |
|---------|--------|---------|-------------|
| Dissociation (Aramini) | Chelator extraction | Monotonic La→Lu (k_off: 0.197→0.013 s⁻¹) | Tracks k_ex (water exchange) |
| Exchange (Wang) | pH-elution | Bell-shaped, peak at Sm-Gd | Tracks k_f (sulfate formation) |

**The same α-lactalbumin binding site exhibits fundamentally different selectivity patterns depending on which kinetic process is measured.**

---

## Part 2: Summary Table

| Claim | Evidence Strength | Key Sources | Update |
|-------|------------------|-------------|--------|
| Intrinsic kinetic variation across Ln | ★★★★★ | Helm & Merbach, D'Angelo, Persson | STRENGTHENED |
| Kinetics independent of thermodynamics | ★★★★★ | Breen, Renner, Drake, Aramini | CLARIFIED |
| **Different processes → different selectivity** | ★★★★★ | Aramini + Wang | **NEW: Key evidence** |
| Gateway controls kinetics | ★★★★★ | Renner, Drake | Unchanged |
| Scaffold determines selectivity direction | ★★★★★ | Berthomieu 2025 | **NEW** |
| Weaker binding → higher selectivity | ★★★★★ | Larrinaga 2024 | **NEW** |
| No gadolinium break | ★★★★★ | Persson, D'Angelo | **NEW** |
| Complete k_on series | ★★☆☆☆ | Inferred only | Still a gap |
| Predictive regime model | ★★☆☆☆ | Qualitative only | Needs Da parameter |
| Adjacent-Ln separations | ★★☆☆☆ | Ce/La (SF=3) demonstrated | Improved |

---

*Document updated: January 2026*
*Total extractions: 24 (6 new)*
*Purpose: Gap analysis for TiB Opinion/Review manuscript*
`;

export default function Home() {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const dragCounterRef = useRef(0);

  const handleFile = useCallback((file: File) => {
    if (file.type === 'text/markdown' || file.name.endsWith('.md') || file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setMarkdown(content);
        setFileName(file.name);
        setIsEditing(false);
      };
      reader.readAsText(file);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  // Use document-level event listeners for reliable drag and drop
  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current++;
      if (e.dataTransfer?.types.includes('Files')) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current--;
      if (dragCounterRef.current === 0) {
        setIsDragging(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current = 0;
      setIsDragging(false);

      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
    };

    // Add listeners to document to capture all drag events
    document.addEventListener('dragenter', handleDragEnter);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('drop', handleDrop);

    return () => {
      document.removeEventListener('dragenter', handleDragEnter);
      document.removeEventListener('dragleave', handleDragLeave);
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('drop', handleDrop);
    };
  }, [handleFile]);

  return (
    <div className="min-h-screen bg-background">
      {/* Drag overlay */}
      {isDragging && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-blue-500/20 backdrop-blur-sm">
          <div className="rounded-2xl border-4 border-dashed border-blue-500 bg-white/90 px-16 py-12 text-center dark:bg-gray-900/90">
            <svg className="mx-auto h-16 w-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mt-4 text-xl font-semibold text-blue-600 dark:text-blue-400">Drop your markdown file here</p>
            <p className="mt-2 text-sm text-gray-500">.md or .txt files supported</p>
          </div>
        </div>
      )}
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-foreground">
              Markdown Viewer
            </h1>
            {fileName && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                {fileName}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <label className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
              Open File
              <input
                type="file"
                accept=".md,.markdown,.txt"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              {isEditing ? 'Preview' : 'Edit'}
            </button>
            <button
              onClick={() => { setMarkdown(''); setFileName(null); }}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Clear
            </button>
            <button
              onClick={() => { setMarkdown(SAMPLE_MARKDOWN); setFileName(null); }}
              className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:opacity-90"
            >
              Load Sample
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-8">
        {isEditing ? (
          <div className="flex flex-col gap-4">
            <label htmlFor="markdown-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Paste your markdown below:
            </label>
            <textarea
              id="markdown-input"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="h-[70vh] w-full resize-none rounded-lg border border-gray-300 bg-white p-4 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900"
              placeholder="# Enter your markdown here..."
            />
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            {markdown ? (
              <MarkdownViewer content={markdown} />
            ) : (
              <div className="py-20 text-center text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="mt-4 text-lg">No markdown content</p>
                <p className="mt-2 text-sm">Drag & drop a .md file, click &quot;Open File&quot;, or &quot;Load Sample&quot;</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 dark:border-gray-800">
        <div className="mx-auto max-w-5xl px-4 text-center text-sm text-gray-500">
          Built with Next.js, react-markdown, and Tailwind CSS
        </div>
      </footer>
    </div>
  );
}
