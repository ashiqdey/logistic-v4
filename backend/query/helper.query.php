<?php
function format_query($newQuery)
{
        $newQuery->resolved = (bool)$newQuery->resolved;
        $newQuery->ts = (int)$newQuery->ts;

    return $newQuery;
}

