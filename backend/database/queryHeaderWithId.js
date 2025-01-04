const queryHeaderWithId = `SELECT 
          GAMES.id,
					GAMES.name,
					DATE(GAMES.release_date)::text AS release_date,
					GAMES.developer,
					GAMES.publisher,
					json_agg(DISTINCT PLATFORMS.platform) AS Platforms,
					GAMES.genre,
					GAMES.price,
					GAMES.metascore,
					CASE
						WHEN GAMES.has_singleplayer = TRUE THEN 'True'
						ELSE 'False'
					END AS has_singleplayer,
					CASE
						WHEN GAMES.has_multiplayer = TRUE THEN 'True'
						ELSE 'False'
					END AS has_multiplayer,
					CASE
						WHEN NOT EXISTS (SELECT DLCS.id
								FROM GAMES AS g2 JOIN DLCS
									ON g2.id = DLCS.id_game
								WHERE g2.id = GAMES.id
						) THEN '[]'
						ELSE json_agg(DISTINCT jsonb_build_object(
								'name', dlc_name,
								'release_date', dlc_release_date,
								'price', dlc_price)) 
					END AS dlc
					
				FROM GAMES JOIN PLATFORMS 
					ON GAMES.id = PLATFORMS.id_game
						LEFT OUTER JOIN DLCS
							ON GAMES.id = DLCS.id_game
							
				`

module.exports = queryHeaderWithId