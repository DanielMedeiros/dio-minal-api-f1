// F1 Minimal Dashboard - Frontend Logic

document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const teamSearchForm = document.getElementById("search-team-form");
    const teamSearchInput = document.getElementById("team-search-input");
    const driverSearchForm = document.getElementById("search-driver-form");
    const driverSearchInput = document.getElementById("driver-search-input");
    
    const btnListTeams = document.getElementById("btn-list-teams");
    const btnListDrivers = document.getElementById("btn-list-drivers");
    
    const resultsTitle = document.getElementById("results-title");
    const resultsCount = document.getElementById("results-count");
    const resultsContainer = document.getElementById("results-container");
    const loader = document.getElementById("loader");

    // Dynamic API Base URL detection
    const getBaseUrl = () => {
        if (window.location.protocol === "file:") {
            return "http://localhost:3333/api/v1";
        }
        return "/api/v1";
    };
    
    const BASE_URL = getBaseUrl();

    // Helper: Map entity names to CSS branding classes
    const getTeamClassByEntityName = (name) => {
        const lower = name.toLowerCase();
        if (lower.includes("ferrari") || lower.includes("leclerc") || lower.includes("hamilton")) return "team-ferrari";
        if (lower.includes("mercedes") || lower.includes("russell")) return "team-mercedes";
        if (lower.includes("red bull") || lower.includes("redbull") || lower.includes("verstappen")) return "team-redbull";
        if (lower.includes("mclaren") || lower.includes("norris") || lower.includes("piastri")) return "team-mclaren";
        if (lower.includes("aston martin") || lower.includes("alonso")) return "team-aston";
        if (lower.includes("alpine")) return "team-alpine";
        if (lower.includes("williams") || lower.includes("albon")) return "team-williams";
        if (lower.includes("visa cash") || lower.includes("rb") || lower.includes("tsunoda")) return "team-rb";
        if (lower.includes("sauber") || lower.includes("hülkenberg") || lower.includes("hulkenberg")) return "team-sauber";
        if (lower.includes("haas")) return "team-haas";
        return "";
    };

    // Helper: Map driver names to their 2026 teams
    const getDriverTeamName = (driverName) => {
        const lower = driverName.toLowerCase();
        if (lower.includes("hamilton") || lower.includes("leclerc")) return "Scuderia Ferrari";
        if (lower.includes("russell")) return "Mercedes-AMG Petronas F1 Team";
        if (lower.includes("verstappen")) return "Oracle Red Bull Racing";
        if (lower.includes("norris") || lower.includes("piastri")) return "McLaren F1 Team";
        if (lower.includes("alonso")) return "Aston Martin Aramco F1 Team";
        if (lower.includes("albon")) return "Williams Racing";
        if (lower.includes("hülkenberg") || lower.includes("hulkenberg")) return "Stake F1 Team Kick Sauber";
        if (lower.includes("tsunoda")) return "Visa Cash App RB F1 Team";
        return "Grid F1 2026";
    };

    // Helper: Generate initials for avatar circles
    const getInitials = (name) => {
        const cleanName = name.replace(/scuderia|oracle|visa cash app|kick|stake|future|team|racing|f1|amg|petronas/gi, "").trim();
        const parts = cleanName.split(/\s+/).filter(p => p.length > 0);
        
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        } else if (parts.length === 1) {
            return parts[0].substring(0, 2).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    // UI Handler: Show Loading State
    const showLoading = (isLoading) => {
        if (isLoading) {
            loader.style.display = "flex";
            resultsContainer.innerHTML = "";
            resultsCount.style.display = "none";
        } else {
            loader.style.display = "none";
        }
    };

    // UI Handler: Render Grid Cards
    const renderResults = (items, type) => {
        resultsContainer.innerHTML = "";
        
        if (!items || items.length === 0) {
            renderEmptyState("Nenhum resultado encontrado.");
            return;
        }

        resultsCount.innerText = `${items.length} ${items.length === 1 ? "item" : "itens"}`;
        resultsCount.style.display = "inline-block";

        items.forEach(item => {
            const card = document.createElement("div");
            const teamClass = getTeamClassByEntityName(item);
            card.className = `result-card ${teamClass}`;
            
            const initials = getInitials(item);
            const metaInfo = type === "driver" ? getDriverTeamName(item) : "Equipe Oficial";
            const badgeLabel = type === "driver" ? "Piloto" : "Equipe";

            card.innerHTML = `
                <div class="card-avatar">${initials}</div>
                <div class="card-info">
                    <span class="card-meta">${badgeLabel}</span>
                    <h4 class="card-title">${item}</h4>
                    <p class="card-description" style="margin-bottom:0; font-size:0.8rem;">${metaInfo}</p>
                </div>
            `;
            resultsContainer.appendChild(card);
        });
    };

    // UI Handler: Render Single Result
    const renderSingleResult = (item, type) => {
        renderResults([item], type);
    };

    // UI Handler: Render Error State
    const renderError = (message) => {
        resultsCount.style.display = "none";
        resultsContainer.innerHTML = `
            <div class="error-state">
                <div class="error-icon">⚠️</div>
                <h4>Falha na Consulta</h4>
                <p>${message}</p>
            </div>
        `;
    };

    // UI Handler: Render Empty State
    const renderEmptyState = (message) => {
        resultsCount.style.display = "none";
        resultsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🏁</div>
                <p>${message}</p>
            </div>
        `;
    };

    // API Call: Generic Fetch Wrapper
    const apiFetch = async (endpoint) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || `Erro do servidor: ${response.status}`);
            }
            return data;
        } catch (err) {
            console.error("Fetch error:", err);
            throw err;
        }
    };

    // Event Handlers: Search Team
    teamSearchForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const query = teamSearchInput.value.trim();
        if (!query) return;

        resultsTitle.innerText = `Busca por Equipe: "${query}"`;
        showLoading(true);

        try {
            const result = await apiFetch(`/teams/${encodeURIComponent(query)}`);
            showLoading(false);
            if (result && result.data) {
                renderSingleResult(result.data, "team");
            } else {
                renderError(`Equipe "${query}" não encontrada.`);
            }
        } catch (error) {
            showLoading(false);
            renderError(error.message || `Não foi possível encontrar a equipe "${query}".`);
        }
    });

    // Event Handlers: Search Driver
    driverSearchForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const query = driverSearchInput.value.trim();
        if (!query) return;

        resultsTitle.innerText = `Busca por Piloto: "${query}"`;
        showLoading(true);

        try {
            const result = await apiFetch(`/drivers/${encodeURIComponent(query)}`);
            showLoading(false);
            if (result && result.data) {
                renderSingleResult(result.data, "driver");
            } else {
                renderError(`Piloto "${query}" não encontrado.`);
            }
        } catch (error) {
            showLoading(false);
            renderError(error.message || `Não foi possível encontrar o piloto "${query}".`);
        }
    });

    // Event Handlers: List All Teams
    btnListTeams.addEventListener("click", async () => {
        resultsTitle.innerText = "Todas as Equipes (Temporada 2026)";
        showLoading(true);

        try {
            const result = await apiFetch("/teams");
            showLoading(false);
            if (result && result.data) {
                renderResults(result.data, "team");
            } else {
                renderError("Nenhuma equipe retornada pela API.");
            }
        } catch (error) {
            console.error("List teams error:", error);
            showLoading(false);
            renderError("Erro ao recuperar a lista de equipes do servidor.");
        }
    });

    // Event Handlers: List All Drivers
    btnListDrivers.addEventListener("click", async () => {
        resultsTitle.innerText = "Todos os Pilotos Projetados (Temporada 2026)";
        showLoading(true);

        try {
            const result = await apiFetch("/drivers");
            showLoading(false);
            if (result && result.data) {
                renderResults(result.data, "driver");
            } else {
                renderError("Nenhum piloto retornado pela API.");
            }
        } catch (error) {
            console.error("List drivers error:", error);
            showLoading(false);
            renderError("Erro ao recuperar a lista de pilotos do servidor.");
        }
    });
});
