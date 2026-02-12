/**
 * EclipseSec Tools Data & Rendering
 *
 * To add a new tool, add an entry to the TOOLS array below.
 * Fields:
 *   - name: Tool name (required)
 *   - tagline: Short one-line description (required)
 *   - description: Longer description, 2-3 sentences (required)
 *   - tags: Array of tag strings (required)
 *   - githubUrl: GitHub repository URL (required)
 *   - docsUrl: Documentation URL (optional)
 *   - language: Primary language (optional)
 *   - platform: Target platform (optional)
 *   - status: "Active", "WIP", or "Archived" (optional, defaults to "Active")
 */

const TOOLS = [
  {
    name: "Cobalt Strike Linux Beacon",
    tagline: "Proof of Concept (PoC) custom Cobalt Strike Linux Beacon",
    description: "Custom Linux Beacon that supports HTTP/S listeners with built-in commands, BOF support, and SOCKS proxy",
    tags: ["Linux", "Tooling"],
    githubUrl: "https://github.com/EricEsquivel/CobaltStrike-Linux-Beacon",
    language: "C",
    platform: "Linux",
    status: "Active"
  },
  {
    name: "GhostKatz",
    tagline: "Kernel-Assisted LSASS Dumping",
    description: "Dump LSASS via physical memory read primitives in vulnerable kernel drivers",
    tags: ["Windows", "Driver", "Tooling"],
    githubUrl: "https://github.com/RainbowDynamix/GhostKatz",
    language: "C",
    platform: "Windows",
    status: "Active"
  },
  {
    name: "EventHorizon",
    tagline: "ETW Detection Framework",
    description: "Tool that gathers a customizable set of ETW telemetry and generates user-defined detections",
    tags: ["Windows", "Telemetry", "Detection"],
    githubUrl: "https://github.com/HullaBrian/EventHorizon",
    language: "C++",
    platform: "Windows",
    status: "Active"
  },
  {
    name: "COMmander",
    tagline: "RPC & COM Detection via ETW Telemetry",
    description: ".NET tool used to enrich RPC telemetry",
    tags: ["Windows", "Telemetry", "Detection"],
    githubUrl: "https://github.com/HullaBrian/COMmander",
    language: "C#",
    platform: "Windows",
    status: "Active"
  },
  {
    name: "GoodBaiii",
    tagline: "Vulnerable Driver Exploitation",
    description: "Killing any process from low integrity via the BdApiUtil driver from Baidu AV",
    tags: ["Windows", "Driver", "Tooling"],
    githubUrl: "https://github.com/RainbowDynamix/GoodBaiii",
    language: "C",
    platform: "Windows",
    status: "Active"
  },
  {
    name: "Inline-EA",
    tagline: "Post-Exploitation Beacon Object File (BOF)",
    description: "Cobalt Strike BOF for evasive .NET assembly executions",
    tags: ["Windows", "Tooling", "Opsec"],
    githubUrl: "https://github.com/EricEsquivel/Inline-EA",
    language: "C",
    platform: "Windows",
    status: "Active"
  },
];

// State
let activeTag = 'all';
let searchQuery = '';

// Tags to exclude from filter buttons
const EXCLUDED_TAGS = ['WDAC', 'Hardening', 'Defense'];

// Get all unique tags from tools (excluding certain tags)
function getAllTags() {
  const tags = new Set();
  TOOLS.forEach(tool => tool.tags.forEach(tag => {
    if (!EXCLUDED_TAGS.includes(tag)) {
      tags.add(tag);
    }
  }));
  return Array.from(tags).sort();
}

// Filter tools based on search and tag
function filterTools() {
  return TOOLS.filter(tool => {
    const matchesTag = activeTag === 'all' || tool.tags.includes(activeTag);
    const matchesSearch = searchQuery === '' ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });
}

// Render a single tool card
function renderToolCard(tool) {
  const statusClass = tool.status ? `status-${tool.status.toLowerCase()}` : '';
  const statusBadge = tool.status && tool.status !== 'Active'
    ? `<span class="tool-status ${statusClass}">${tool.status}</span>`
    : '';

  const docsButton = tool.docsUrl
    ? `<a href="${tool.docsUrl}" class="tool-btn tool-btn-docs" target="_blank" rel="noreferrer">Docs</a>`
    : '';

  const metadata = [];
  if (tool.language) metadata.push(tool.language);
  if (tool.platform) metadata.push(tool.platform);
  const metadataHtml = metadata.length > 0
    ? `<div class="tool-meta">${metadata.join(' · ')}</div>`
    : '';

  return `
    <article class="tool-card">
      <div class="tool-card-content">
        <div class="tool-header">
          <h3 class="tool-name">${tool.name}</h3>
          ${statusBadge}
        </div>
        <p class="tool-tagline">${tool.tagline}</p>
        <div class="tool-tags">
          ${tool.tags.map(tag => `<span class="tool-tag">${tag}</span>`).join('')}
        </div>
        <p class="tool-description">${tool.description}</p>
      </div>
      <div class="tool-card-footer">
        ${metadataHtml}
        <div class="tool-buttons">
          <a href="${tool.githubUrl}" class="tool-btn tool-btn-github" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 0.5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.38.82 1.11.82 2.24v3.32c0 .32.22.69.82.58A12 12 0 0 0 12 0.5z"/></svg>
            GitHub
          </a>
          ${docsButton}
        </div>
      </div>
    </article>
  `;
}

// Render the tools grid
function renderTools() {
  const grid = document.getElementById('tools-grid');
  const empty = document.getElementById('tools-empty');
  if (!grid) return;

  const filteredTools = filterTools();

  if (filteredTools.length === 0) {
    grid.style.display = 'none';
    if (empty) empty.style.display = 'block';
  } else {
    grid.style.display = '';
    if (empty) empty.style.display = 'none';
    grid.innerHTML = filteredTools.map(renderToolCard).join('');
  }
}

// Render tag filter buttons
function renderTagFilters() {
  const container = document.getElementById('tools-tags');
  if (!container) return;

  const allTags = getAllTags();
  const tags = ['all', ...allTags];

  container.innerHTML = tags.map(tag => {
    const isActive = tag === activeTag ? 'active' : '';
    const label = tag === 'all' ? 'All' : tag;
    return `<button class="tools-tag-btn ${isActive}" data-tag="${tag}">${label}</button>`;
  }).join('');

  // Add click handlers
  container.querySelectorAll('.tools-tag-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTag = btn.dataset.tag;
      renderTagFilters();
      renderTools();
    });
  });
}

// Initialize
function initTools() {
  const searchInput = document.getElementById('tools-search');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderTools();
    });
  }

  renderTagFilters();
  renderTools();
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTools);
} else {
  initTools();
}
