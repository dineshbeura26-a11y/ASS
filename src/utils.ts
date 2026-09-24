export function formatScoreGrade(score: number): { grade: string; color: string; label: string } {
  if (score >= 95) return { grade: 'A+', color: 'text-emerald-400', label: 'Exceptional' };
  if (score >= 90) return { grade: 'A', color: 'text-emerald-400', label: 'Excellent' };
  if (score >= 80) return { grade: 'B', color: 'text-blue-400', label: 'Good' };
  if (score >= 70) return { grade: 'C', color: 'text-amber-400', label: 'Acceptable' };
  return { grade: 'D', color: 'text-rose-400', label: 'Needs Optimization' };
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function downloadTextFile(filename: string, text: string): void {
  const element = document.createElement('a');
  const file = new Blob([text], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
